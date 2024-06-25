const path = require('path');

module.exports = async kernel =>
{
	const hasInstall = await kernel.exists(__dirname, 'dough-env') && !await kernel.running(__dirname, 'install.js');

	let menu = [];

	if (hasInstall)
	{
		// app running
        if (kernel.running(__dirname, 'start.js'))
		{
			menu =
            [
                {
                    icon: 'fa-solid fa-power-off',
                    text: 'Stop',
                    href: 'stop.js',
                    params:
                    {
                        fullscreen: true
                    }
                }
            ];
		}
        // app stopped
		else
		{
			menu =
			[
				{
					icon: 'fa-solid fa-desktop',
					text: 'Start',
					href: 'start.js',
					params:
					{
						run: true,
						fullscreen: true,
						mode: 'Default'
					}
				}
			];
		}
	}
    // fresh install 
	else
	{
		menu =
		[
			{
				icon: 'fa-solid fa-plug',
				text: 'Install',
				href: 'install.js',
				params:
				{
					run: true,
					fullscreen: true
				}
			}
		];
	}
	return menu;
};
