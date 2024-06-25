module.exports = () =>
    {
        const config =
        {
            daemon: true,
            run:
            [
                {
                    method: 'shell.run',
                    params:
                    {
                        message: 'streamlit run app.py --runner.fastReruns false --server.port 5500',
                        path: './'
                    }
                },
                {
                    method: 'local.set',
                    params:
                    {
                        url: '{{ input.stdout.match(/(Network URL:\s*http:\\S+)/gi)[0] }}'
                    }
                },
                {
                    method: 'browser.open',
                    params:
                    {
                        uri: '{{ local.url }}',
                        target: '_blank'
                    }
                }
            ]
        };
    
        return config;
    };
    