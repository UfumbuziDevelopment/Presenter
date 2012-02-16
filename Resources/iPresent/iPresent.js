var iPresent = {
	active : false,
	Laseractive : false,
	Drawactive : false,
	ImageDir : 'iPresent/images/'
};

iPresent.AddLaser = function() {

	if(iPresent.Drawactive === true) {
		iPresent.RemovePaint();
	}

	iPresent.LaserIcon.backgroundImage = iPresent.ImageDir + 'LaserIcon-Active.png';
	iPresent.MenuIcon.backgroundImage = iPresent.ImageDir + 'ButtonIcon-Active.png';
	iPresent.Laseractive = true;

	iPresent.laserOverlay = Titanium.UI.createView({
		top : 0,
		bottom : 0,
		left : 0,
		right : 0,
		backgroundColor : 'transparent',
		zIndex : iPresent.zIndex
	});

	iPresent.laser = Titanium.UI.createView({
		width : 63,
		height : 63,
		backgroundColor : 'transparent',
		backgroundImage : iPresent.ImageDir + 'laser.png',
		touchEnabled : false,
		opacity : 0,
		zIndex : iPresent.zIndex + 200
	});

	iPresent.LaserStart = function(e) {
		iPresent.laser.center = {
			x : e.x,
			y : e.y
		};
		setTimeout(function() {
			iPresent.laser.opacity = 1.0;
		}, 100);
	};
	iPresent.LaserMove = function(e) {
		iPresent.laser.center = {
			x : e.x,
			y : e.y
		};
	};
	iPresent.LaserEnd = function(e) {
		iPresent.laser.opacity = 0;
	};

	iPresent.laserOverlay.addEventListener('touchstart', iPresent.LaserStart);
	iPresent.laserOverlay.addEventListener('touchmove', iPresent.LaserMove);
	iPresent.laserOverlay.addEventListener('touchend', iPresent.LaserEnd);
	iPresent.laserOverlay.add(iPresent.laser);
	iPresent.Win.visible = true;
	iPresent.Win.add(iPresent.laserOverlay);
	Ti.API.info('Added Laser Overlay');

};

iPresent.RemoveLaser = function() {
	if(iPresent.Laseractive === true) {
		iPresent.MenuIcon.backgroundImage = iPresent.ImageDir + 'ButtonIcon.png';
		iPresent.LaserIcon.backgroundImage = iPresent.ImageDir + 'LaserIcon.png';
		iPresent.Laseractive = false;

		iPresent.laserOverlay.remove(iPresent.laser);
		iPresent.Win.remove(iPresent.laserOverlay);
		Ti.API.info('Removed Laser Overlay');
		iPresent.Win.visible = false;
	}
};

iPresent.AddPaint = function() {
	if(iPresent.Laseractive === true) {
		iPresent.RemoveLaser();
	}

	iPresent.DrawIcon.backgroundImage = iPresent.ImageDir + 'DrawIcon-Active.png';
	iPresent.MenuIcon.backgroundImage = iPresent.ImageDir + 'ButtonIcon-Active.png';
	iPresent.Drawactive = true;

	iPresent.paintView = iPresent.Paint.createPaintView({
		top : 0,
		right : 0,
		bottom : 0,
		left : 0,
		strokeColor : '#0f0',
		strokeAlpha : 255,
		strokeWidth : 10,
		eraseMode : false,
		backgroundColor : 'transparent',
		zIndex : iPresent.zIndex
	});

	iPresent.Win.visible = true;
	iPresent.Win.add(iPresent.paintView);
	Ti.API.info('Added Paint Overlay');
};

iPresent.RemovePaint = function() {
	if(iPresent.Drawactive === true) {
		iPresent.MenuIcon.backgroundImage = iPresent.ImageDir + 'ButtonIcon.png';
		iPresent.DrawIcon.backgroundImage = iPresent.ImageDir + 'DrawIcon.png';
		iPresent.Drawactive = false;

		iPresent.Win.remove(iPresent.paintView);
		iPresent.Win.visible = false;
		Ti.API.info('Removed Paint Overlay');
	}
};

iPresent.CreateMenu = function() {
	iPresent.Menu = Titanium.UI.createWindow({
		top : iPresent.menuVPos,
		height : 40,
		width : 'auto',
		backgroundColor : 'transparent',
		layout : 'horizontal',
		zIndex : iPresent.zIndex * 2
	});

	iPresent.MenuButton = Titanium.UI.createView({
		top : 0,
		height : 40,
		width : 41,
		backgroundColor : 'transparent',
		zIndex : 10
	});

	iPresent.MenuIcon = Titanium.UI.createView({
		height : 27,
		width : 24,
		backgroundColor : 'transparent',
		backgroundImage : iPresent.ImageDir + 'ButtonIcon.png'
	});
	iPresent.MenuButton.add(iPresent.MenuIcon);

	iPresent.MenuBG = Titanium.UI.createView({
		top : 0,
		height : 40,
		width : 0,
		backgroundColor : 'transparent',
		backgroundImage : iPresent.ImageDir + 'sliderbg.png',
		zIndex : 0
	});

	iPresent.MenuTab = Titanium.UI.createView({
		top : 0,
		height : 40,
		width : 17,
		backgroundColor : 'transparent',
		zIndex : 10
	});

	iPresent.LaserIcon = Titanium.UI.createView({
		top : 0,
		left : 5,
		height : 40,
		width : 41,
		backgroundColor : 'transparent',
		backgroundImage : iPresent.ImageDir + 'LaserIcon.png'
	});

	if(iPresent.usePaint === true) {
		iPresent.DrawIcon = Titanium.UI.createView({
			top : 0,
			left : 51,
			height : 40,
			width : 41,
			backgroundColor : 'transparent',
			backgroundImage : iPresent.ImageDir + 'DrawIcon.png'
		});

		iPresent.DrawIcon.addEventListener('click', function(e) {
			if(iPresent.Drawactive === false) {
				iPresent.AddPaint();
				Ti.API.info('Draw Active');
				iPresent.MenuButton.fireEvent('click');
			} else {
				iPresent.RemovePaint();
				Ti.API.info('Draw Not Active');
				iPresent.MenuButton.fireEvent('click');
			}
		});
	}

	iPresent.LaserIcon.addEventListener('click', function(e) {
		if(iPresent.Laseractive === false) {
			iPresent.AddLaser();
			Ti.API.info('Laser Active');
			iPresent.MenuButton.fireEvent('click');
		} else {
			iPresent.RemoveLaser();
			Ti.API.info('Laser Not Active');
			iPresent.MenuButton.fireEvent('click');
		}
	});

	iPresent.MenuButton.addEventListener('click', function(e) {
		if(iPresent.active === false) {
			iPresent.active = true;

			if(iPresent.usePaint === true) {
				iPresent.MenuBG.width = 97;
				iPresent.MenuBG.add(iPresent.LaserIcon);
				iPresent.MenuBG.add(iPresent.DrawIcon);
			} else {
				iPresent.MenuBG.width = 51;
				iPresent.MenuBG.add(iPresent.LaserIcon);
			}
		} else {
			iPresent.active = false;
			iPresent.MenuBG.remove(iPresent.LaserIcon);
			if(iPresent.usePaint === true) {
				iPresent.MenuBG.remove(iPresent.DrawIcon);
			}
			iPresent.MenuBG.width = 0;
		}
	});
	if(iPresent.menuLocation == 'left') {
		iPresent.MenuButton.backgroundImage = iPresent.ImageDir + 'button.png';
		iPresent.MenuTab.backgroundImage = iPresent.ImageDir + 'tab.png';
		iPresent.Menu.left = 0;
		iPresent.MenuButton.left = 0;
		iPresent.MenuBG.left = -1;
		iPresent.MenuTab.left = -1;
		iPresent.Menu.add(iPresent.MenuButton);
		iPresent.Menu.add(iPresent.MenuBG);
		iPresent.Menu.add(iPresent.MenuTab);
	} else {
		iPresent.MenuButton.backgroundImage = iPresent.ImageDir + 'button-right.png';
		iPresent.MenuTab.backgroundImage = iPresent.ImageDir + 'tab-right.png';
		iPresent.Menu.right = 0;
		iPresent.MenuButton.right = 0;
		iPresent.MenuBG.right = -1;
		iPresent.MenuTab.right = -1;
		iPresent.Menu.add(iPresent.MenuTab);
		iPresent.Menu.add(iPresent.MenuBG);
		iPresent.Menu.add(iPresent.MenuButton);
	}

	return iPresent.Menu;
};

iPresent.CreateMainWindow = function() {
	iPresent.Win = Titanium.UI.createWindow({
		backgroundColor : 'transparent',
		zIndex : iPresent.zIndex + 800,
		visible : false
	});
	return iPresent.Win;
};

exports.Overlay = function(_args) {
	iPresent.menuVPos = _args.menuVPos || 200;
	iPresent.usePaint = _args.usePaint || false;
	iPresent.PaintPreLoaded = _args.PaintPreLoaded || false;
	iPresent.menuLocation = _args.menuLocation || 'left';
	iPresent.zIndex = _args.zIndex || 1000;

	if(iPresent.usePaint === true && iPresent.PaintPreLoaded === false) {
		iPresent.Paint = require("ti.paint");
	}

	iPresent.CreateMainWindow().open();
	iPresent.CreateMenu().open();
	return iPresent;
};
