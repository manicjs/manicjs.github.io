/**
 * Created by MrIsaacs on 28.05.2016.
 */

var Manic = new function () {
    var self = this;
    this.version = "2.1.0-beta";
    /*
     * @todo: method set must refresh document header
     *   so when the property is being changed the property
     *   points to document head and changes it too.
     * @todo: create new header "M-Request-Type" with
     *   possible values: "list", "content"
     */
    this.head = {
        requestId : 1,
        requestType : "info",
        requestUrl : "home"
    };
    this.contextMgr = {
        container : "",
        content : ""
    };
    this.scripts = {
        framework: {
            url: ["mootools", "mootools-more"],
            fn: () => {
                console.log('loaded MooTools');

                self.contextMgr.container = $$('div#wrapper ^ div')[0];
                self.contextMgr.content = $$('.article-layer')[0];


            }
        },
        markdown: {
            url: ["showdown", "moodown"],
            refresh: "undefined",
            fn: () => {
                console.log('loaded Markdown');

                self.scripts.markdown.refresh = () => {
                    "use strict";
                    let i = document.getElementsByTagName('a').length;
                    for (let j = 0; j < i; j++){
                        document.getElementsByTagName('a')[j].addEventListener('click', event => {
                            event.preventDefault();

                            self.head.requestId = event.target.dataset.id;
                            self.head.requestType = event.target.dataset.hasOwnProperty('id') ? 'info' : 'list';
                            console.log(self.head.requestType);
                            self.head.requestUrl = event.target.dataset.link;

                            self.getContent(self.head.requestUrl);
                        });
                    }
                };
            }
        },
        router: {
            url: "navigo",
            instance : "undefined",
            fn: () => {
                console.log('loaded Navigo');

                self.scripts.router.instance = new Navigo('/manic', true).on({
                    'changelog/list': () => {
                        self.head.requestType = 'list';

                        self.getContent('changelog');

                        console.log('changlog-list');
                    },
                    'changelog/:id': params => {
                        self.head.requestType = 'list';
                        self.head.requestId = params.id;

                        self.getContent('changelog');

                        console.log('article-' + self.head.requestId);
                    },
                    'credits': () => {
                        self.head.requestType = 'info';
                        self.head.requestId = 1;

                        self.getContent('credits');

                        console.log('credits');
                    },
                    '/': () => {
                        self.head.requestType = 'info';
                        self.head.requestId = 1;

                        self.getContent('home');

                        console.log('home');
                    }
                }).navigate(
                    window.location.hash.length
                        ?window.location.hash
                        :(window.location.href[window.location.href.length-1]==="#"
                            ?''
                            :'/manic/#'
                        )
                );
            }
        }
    };

    this.initialize = () => {
        console.log('Manic Version ' + this.getVersion());
        document.onreadystatechange = () => {
            if (document.readyState === 'complete') {
                var i = document.getElementsByTagName('a').length;
                for (let j = 0; j < i; j++){
                    document.getElementsByTagName('a')[j].addEventListener('click',event => {
                        event.preventDefault();
                    });
                }

                self.getScriptCollection();
            }
        }
    };

    this.getVersion = () => {
        return this.version;
    };
    this.isArray = e => {
        if (Object.prototype.toString.call( e ) === '[object Array]') {
            return true;
        } else  {
            return false;
        }
    };
    this.isPromise = e => {
        if (Object.prototype.toString.call(e) === '[object Promise]') {
            return true;
        } else {
            return false;
        }
    };
    this.getJS = url => {
        "use strict";
        /* activate state requested */
        /* @todo: add eventhandler for handling the request state */
        return new Promise((resolve, reject) => {
            /* Do the usual XHR stuff */
            var req = new XMLHttpRequest();
            req.open('GET', './js/' + url + '.js');

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
    };
    this.getJSON = url => {
        return new Promise((resolve, reject) => {
            // Do the usual XHR stuff
            var req = new XMLHttpRequest();
            url = './data/' + url + '.json';
            console.log('loaded file: ' + url);
            req.open('GET', url);

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
    };

    this.getScripts = scripts => {
        "use strict";
        var self = this;

        if (self.isArray(scripts.url)) {
            return scripts.url.reduce((sequence, url) => {
                return sequence.then(() => {
                    return self.getJS(url);
                }).then(response => {
                    self.insertScript(response, scripts);

                    if(scripts.url[scripts.url.length-1] === url) {
                        if (scripts.hasOwnProperty('fn')) {
                            scripts.fn(new Function(response.script)());
                        }
                    }
                });
            }, Promise.resolve());
        } else {
            return self.getJS(scripts.url).then(response => {
                self.insertScript(response, scripts);

                if (scripts.hasOwnProperty('fn')) {
                    scripts.fn(new Function(response.script)());
                }
            });
        }
    };

    this.insertScript = (response, script) => {
        var s = document.createElement('script');
        s.innerHTML = response.script;

        document.body.appendChild(s);
    };

    this.getScriptCollection = () => {
        "use strict";
        var self = this;
        var scripts = self.scripts;

        var sequence = Promise.resolve();

        Object.keys(scripts).forEach(script => {
            sequence = sequence.then(() => {
                return self.getScripts(scripts[script]);
            });
        });
    };

    this.getContent = site => {
        "use strict";

        self.getJSON(site).then(response => {
            // start loading animation
            if(self.head.requestType === 'info') {
                // show shimmer animation
                $$('.article-layer').addClass('hidden no-anim');
                $$('.shimmer-layer').addClass('no-anim');
                $$('.shimmer-layer').removeClass('hidden');

                // todo: check if the same info were requested
                if ($('list')) {
                    $('list').destroy();
                }
            } else if (self.head.requestType === 'list') {
                // todo: check if the same list were requested
                if ($('detail')) {
                    $('detail').destroy();
                }
            }
            return response;
        }).then(response => {
            // todo: extract info and list as functions
            // INFO
            if(self.head.requestType === 'info') {
                var requestID   = self.head.requestId;
                var index       = response.index[requestID.toString()];
                var article     = response.data[index];
                // todo: use addAttribute
                var content = '<div class="one-third column">' +
                    '<a class="avatar-wrapper">' +
                    '<span class="integral">' +
                    '∫' +
                    '</span>' +
                    '<span class="initial">' +
                    'M' +
                    '</span>' +
                    '</a>' +
                    '</div>';

                // todo: prevent via singleton pattern!
                // prevent a second detail-element is being created
                // when one already exists
                if (!$('detail')) {
                    var detail = new Element('div',{
                        'id'    : 'detail',
                        'class' : 'row section content',
                        html    : content
                    }).inject(self.contextMgr.container, 'bottom');
                    new Element('div',{
                        'class' : 'main-article two-thirds column',
                        html    : '<div class="article-layer">' +
                        '<h1 id="main-title"></h1>' +
                        '<p id="main-date"></p>' +
                        '<p id="main-body"></p>' +
                        '</div>'
                    }).inject(detail);
                }

                // todo: exchange document title with a variable
                document.title = "Manic - " + article.title;

                $('main-title').set('text', article.title);
                $('main-date').set('text', new Date(article.date).timeDiffInWords());
                $('main-date').set('title', article.date);

                new MooDown('main-body', {
                    markdown    : article.body
                });

                // hide shimmer animation
                $$('.shimmer-layer').removeClass('no-anim');
                $$('.shimmer-layer').addClass('hidden');
                $$('.article-layer').removeClass('hidden no-anim');

                if (typeof self.scripts.markdown.refresh === "function") {
                    // safe to use the function
                    console.log('refresh function do exist');
                    self.scripts.markdown.refresh();
                    self.scripts.router.instance.updatePageLinks();
                } else {
                    console.log('refresh function is not defined');
                }
            }
            // LIST
            else if(self.head.requestType === 'list') {
                // last added content in json files must go to data[0]
                var id = response.data[0].id;
                var container = [];

                if (!$('list')) {
                    for(var i = 0; i < response.data.length; i++) {
                        var index   = response.index[id];
                        var content = '';
                        /**
                         * push a section to the container
                         */
                        if(!(i % 3)) {
                            container.push(new Element('div', {
                                'class' : 'row section list'
                            }));
                        }
                        // todo: use addAttribute
                        content += '<h3><a data-navigo data-id="';
                        content += response.data[index].id;
                        content += '" href="';
                        content += response.data[index].link + '/' + response.data[index].id;
                        content += '" data-link="';
                        content += response.data[index].link;
                        content += '">';
                        content += response.data[index].title;
                        content += '</a></h3>';
                        content += '<p>';
                        content += response.data[index].short;
                        content += '</p>';
                        /**
                         * add new element to the bottom in the
                         * current container
                         */
                        new Element('div',{
                            'class' : 'short-article one-third column',
                            html    : content
                        }).inject(container[container.length - 1], 'bottom');
                        // if the previous id isn't null get previous
                        if(self.prev(response, id) !== null) {
                            id = self.prev(response, id).id;
                        }
                    }
                    new Element('div',{
                        'id'    : 'list'
                    }).inject($('wrapper').getFirst());
                    for(var i = container.length - 1; i >= 0; i--) {
                        container[i].inject($('list'), 'top');
                    }
                }

                // todo: exchange document title with a variable
                document.title = "Manic - ";// + article.title;


                // hide shimmer animation
                $$('.shimmer-layer').removeClass('no-anim');
                $$('.shimmer-layer').addClass('hidden');
                $$('.article-layer').removeClass('hidden no-anim');

                if (typeof self.scripts.markdown.refresh === "function") {
                    // safe to use the function
                    console.log('refresh function do exist');
                    self.scripts.markdown.refresh();
                    self.scripts.router.instance.updatePageLinks();
                } else {
                    console.log('refresh function is not defined');
                }
            }
        });
    };

    this.prev = (db, key) => {
        "use strict";
        var next = db.index[key] + 1;
        if(next >= db.data.length) {
            return null;
        }
        return db.data[next];
    };
    this.next = (db, key) => {
        "use strict";
        var next = db.index[key] - 1;
        if(next < 0) {
            return null;
        }
        return db.data[next];
    };

    this.initialize();
};
