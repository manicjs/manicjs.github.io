/**
 * @fileOverview A JavaScript framework manager.
 * @author Ivan Ilic <me@mrisaacs.org>
 * @version 2.1.1
 */
/**
 * Main class for managing different javascript frameworks.
 * @class
 */
class Manic {
    /**
     * Initialize Manic
     * @constructor
     */
    constructor () {
        this._version = "2.1.1";
        this._head = {
            requestId : 1,
            requestType : "info",
            requestUrl : "home"
        };
        this._contextMgr = {
            container : "",
            content : ""
        };
        this._scripts = {
            framework: {
                url: ["mootools", "mootools-more"],
                fn: () => {
                    console.log("loaded MooTools");

                    this._contextMgr.container = $$("div#wrapper ^ div")[0];
                    this._contextMgr.content = $$(".article-layer")[0];


                }
            },
            markdown: {
                url: ["showdown", "moodown"],
                refresh: "undefined",
                fn: () => {
                    console.log("loaded Markdown");

                    this._scripts.markdown.refresh = () => {
                        "use strict";
                        let i = document.getElementsByTagName("a").length;
                        for (let j = 0; j < i; j++){
                            document.getElementsByTagName("a")[j].addEventListener("click", event => {
                                event.preventDefault();

                                this._head.requestId = event.target.dataset.id;
                                this._head.requestType = event.target.dataset.hasOwnProperty("id") ? "info" : "list";
                                console.log(this._head.requestType);
                                this._head.requestUrl = event.target.dataset.link;

                                this.content(this._head.requestUrl);
                            });
                        }
                    };
                }
            },
            router: {
                url: "navigo",
                instance : "undefined",
                fn: () => {
                    console.log("loaded Navigo");

                    this._scripts.router.instance = new Navigo("/manic", true).on({
                        "changelog/list": () => {
                            this._head.requestType = "list";

                            this.content("changelog");

                            console.log("changlog-list");
                        },
                        "changelog/:id": params => {
                            this._head.requestType = "info";
                            this._head.requestId = params.id;

                            this.content("changelog");

                            console.log("article-" + this._head.requestId);
                        },
                        "docs/list": () => {
                            this._head.requestType = "list";

                            this.content("docs");

                            console.log("docs-list");
                        },
                        "docs/:id": params => {
                            this._head.requestType = "info";
                            this._head.requestId = params.id;

                            this.content("docs");

                            console.log("article-" + this._head.requestId);
                        },
                        "credits": () => {
                            this._head.requestType = "info";
                            this._head.requestId = 1;

                            this._getContent("credits");

                            console.log("credits");
                        },
                        "/": () => {
                            this._head.requestType = "info";
                            this._head.requestId = 1;

                            this.content("home");

                            console.log("home");
                        }
                    }).navigate(
                        window.location.hash.length
                            ?window.location.hash
                            :(window.location.href[window.location.href.length-1]==="#"
                                    ?""
                                    :"/#"
                            )
                    );
                }
            }
        };

        console.log("Manic Version " + this.version);
        document.onreadystatechange = () => {
            if (document.readyState === "complete") {
                var i = document.getElementsByTagName("a").length;
                for (let j = 0; j < i; j++){
                    document.getElementsByTagName("a")[j].addEventListener("click",event => {
                        event.preventDefault();
                    });
                }

                this.scriptCollection;
            }
        }
    }

    /**
     * @returns {string}
     */
    get version() {
        return this._version;
    }
    get scriptCollection() {
        var scripts = this._scripts;

        var sequence = Promise.resolve();

        Object.keys(scripts).forEach(script => {
            sequence = sequence.then(() => {
                return this.loadScripts(scripts[script]);
            });
        });
    }

    isArray(e){
        if (Object.prototype.toString.call( e ) === "[object Array]") {
            return true;
        } else  {
            return false;
        }
    }
    isPromise(e){
        if (Object.prototype.toString.call(e) === "[object Promise]") {
            return true;
        } else {
            return false;
        }
    }

    loadJS(url) {
        "use strict";
        /* activate state requested */
        /* @todo: add eventhandler for handling the request state */
        return new Promise((resolve, reject) => {
            /* Do the usual XHR stuff */
            var req = new XMLHttpRequest();
            req.open("GET", "./js/" + url + ".js");

            // @todo: create req.state for eventhandling
            req.onload = () => {
                /* appends index to response  */
                if (req.status == 200) {
                    var response = {
                        script : req.response
                    };

                    // Resolve the promise with the response text
                    resolve(response);
                }
                else {
                    // Otherwise reject with the status text
                    // which will hopefully be a meaningful error
                    reject(Error(req.statusText));
                }
            };

            // Handle network errors
            req.onerror = () => {
                reject(Error("Network Error"));
            };

            // Make the request
            req.send();
        });
    }
    loadJSON(url) {
        return new Promise(function(resolve, reject){
            // Do the usual XHR stuff
            var req = new XMLHttpRequest();
            url = "./data/" + url + ".json";
            console.log("loaded file: " + url);
            req.open("GET", url);

            req.onload = () => {
                // This is called even on 404 etc
                // so check the status
                if (req.status == 200) {
                    // Resolve the promise with the response text
                    resolve(req.response);

                    //console.log(req.response);
                }
                else {
                    // Otherwise reject with the status text
                    // which will hopefully be a meaningful error
                    reject(Error(req.statusText));
                }
            };

            // Handle network errors
            req.onerror = () => {
                reject(Error("Network Error"));
            };

            // Make the request
            req.send();
        }).then(JSON.parse);
    }
    loadScripts(scripts) {
        if (this.isArray(scripts.url)) {
            return scripts.url.reduce((sequence, url) => {
                return sequence.then(() => {
                    return this.loadJS(url);
                }).then(response => {
                    this.insertScript(response, scripts);

                    if(scripts.url[scripts.url.length-1] === url) {
                        if (scripts.hasOwnProperty("fn")) {
                            scripts.fn(new Function(response.script)());
                        }
                    }
                });
            }, Promise.resolve());
        } else {
            return this.loadJS(scripts.url).then(response => {
                this.insertScript(response, scripts);

                if (scripts.hasOwnProperty("fn")) {
                    scripts.fn(new Function(response.script)());
                }
            });
        }
    }

    insertScript(response, script) {
        var s = document.createElement("script");
        s.innerHTML = response.script;

        document.body.appendChild(s);
    }

    content(site) {
        "use strict";

        this.loadJSON(site).then(response => {
            // start loading animation
            if(this._head.requestType === "info") {
                // show shimmer animation
                $$(".article-layer").addClass("hidden no-anim");
                $$(".shimmer-layer").addClass("no-anim");
                $$(".shimmer-layer").removeClass("hidden");

                // todo: check if the same info were requested
                if ($("list")) {
                    $("list").destroy();
                }
            } else if (this._head.requestType === "list") {
                // todo: check if the same list were requested
                if ($("detail")) {
                    $("detail").destroy();
                }
            }
            return response;
        }).then(response => {
            // todo: extract info and list as functions
            // INFO
            if(this._head.requestType === "info") {
                var requestID   = this._head.requestId;
                var index       = response.index[requestID.toString()];
                var article     = response.data[index];
                // todo: use addAttribute
                var content = "<div class=\"one-third column\">" +
                                  "<a class=\"avatar-wrapper\">" +
                                      "<span class=\"initial\">" +
                                        "M" +
                                      "</span>" +
                                      "<span class=\"integral\">" +
                                        "∫" +
                                      "</span>" +
                                  "</a>" +
                              "</div>";

                // todo: prevent via singleton pattern!
                // prevent a second detail-element is being created
                // when one already exists
                if (!$("detail")) {
                    var detail = new Element("div",{
                        "id"    : "detail",
                        "class" : "row section content",
                        html    : content
                    }).inject(this._contextMgr.container, "bottom");
                    new Element("div",{
                        "class" : "main-article two-thirds column",
                        html    : "<div class=\"article-layer\">" +
                                  "<h1 id=\"main-title\"></h1>" +
                                  "<p id=\"main-date\"></p>" +
                                  "<p id=\"main-body\"></p>" +
                                  "</div>"
                    }).inject(detail);
                }

                // todo: exchange document title with a variable
                document.title = "Manic - " + article.title;

                $("main-title").set("text", article.title);
                $("main-date").set("text", new Date(article.date).timeDiffInWords());
                $("main-date").set("title", article.date);

                new MooDown("main-body", {
                    markdown    : article.body
                });
            }
            // LIST
            else if(this._head.requestType === "list") {
                // last added content in json files must go to data[0]
                var id = response.data[0].id;
                var container = [];

                if (!$("list")) {
                    for(var i = 0; i < response.data.length; i++) {
                        var index   = response.index[id];
                        var content = "";
                        /**
                         * push a section to the container
                         */
                        if(!(i % 3)) {
                            container.push(new Element("div", {
                                "class" : "row section list"
                            }));
                        }
                        // todo: use addAttribute
                        content += "<h3><a data-navigo data-id=\"";
                        content += response.data[index].id;
                        content += "\" href=\"";
                        content += response.data[index].link + "/" + response.data[index].id;
                        content += "\" data-link=\"";
                        content += response.data[index].link;
                        content += "\">";
                        content += response.data[index].title;
                        content += "</a></h3>";
                        content += "<p>";
                        content += response.data[index].short;
                        content += "</p>";
                        /**
                         * add new element to the bottom in the
                         * current container
                         */
                        new Element("div",{
                            "class" : "short-article one-third column",
                            html    : content
                        }).inject(container[container.length - 1], "bottom");
                        // if the previous id isn't null get previous
                        if(this.prev(response, id) !== null) {
                            id = this.prev(response, id).id;
                        }
                    }
                    new Element("div",{
                        "id"    : "list"
                    }).inject($("wrapper").getFirst());
                    for(var i = container.length - 1; i >= 0; i--) {
                        container[i].inject($("list"), "top");
                    }
                }

                // todo: exchange document title with a variable
                document.title = "Manic - ";// + article.title;
            }

            // hide shimmer animation
            $$(".shimmer-layer").removeClass("no-anim");
            $$(".shimmer-layer").addClass("hidden");
            $$(".article-layer").removeClass("hidden no-anim");

            if (typeof this._scripts.markdown.refresh === "function") {
                // safe to use the function
                console.log("refresh function do exist");
                this._scripts.markdown.refresh();
                this._scripts.router.instance.updatePageLinks();
            } else {
                console.log("refresh function is not defined");
            }
        });
    }

    /**
     * @since 1.1.2
     * @returns {?Object}
     */
    prev(db, key) {
        "use strict";
        var next = db.index[key] + 1;
        if(next >= db.data.length) {
            return null;
        }
        return db.data[next];
    }

    /**
     * @since 1.1.2
     * @returns {?Object}
     */
    next (db, key) {
        "use strict";
        var next = db.index[key] - 1;
        if(next < 0) {
            return null;
        }
        return db.data[next];
    }
}

const manic = new Manic();
