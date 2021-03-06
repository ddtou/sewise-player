/*
 * Name: VodFoream SewisePlayerSkin framework V1.0.0
 * Author: Jack Zhang
 * Website: http://www.sewise.com/
 * Date: 12th June 2014
 * Copyright: 2014, Sewise
 * 
 */

(function(win, $){
	$(document).ready(function(){
		var mainPlayer = SewisePlayer.IVodPlayer;
		var elementObject = new SewisePlayerSkin.ElementObject();
		var elementLayout = new SewisePlayerSkin.ElementLayout(elementObject);
		var logoBox = new SewisePlayerSkin.LogoBox(elementObject);
		var topBar = new SewisePlayerSkin.TopBar(elementObject);
		var clarityWindow = new SewisePlayerSkin.ClarityWindow(elementObject);
		var controlBar = new SewisePlayerSkin.ControlBar(elementObject, elementLayout, topBar, clarityWindow);
		
		//实现IVodSkin接口//////////////////////////////////////
		SewisePlayerSkin.IVodSkin.player = function(mPlayer){
			mainPlayer = mPlayer;
			controlBar.setPlayer(mainPlayer);
			clarityWindow.setPlayer(mainPlayer);
		}
		SewisePlayerSkin.IVodSkin.started = function(){
			controlBar.started();
		}
		SewisePlayerSkin.IVodSkin.paused = function(){
			controlBar.paused();
		}
		SewisePlayerSkin.IVodSkin.stopped = function(){
			controlBar.stopped();
		}
		SewisePlayerSkin.IVodSkin.duration = function(totalTimes){
			controlBar.setDuration(totalTimes);
		}
		SewisePlayerSkin.IVodSkin.timeUpdate = function(currentTime){
			controlBar.timeUpdate(currentTime);
		}
		SewisePlayerSkin.IVodSkin.loadedProgress = function(loadedPt){
			controlBar.loadProgress(loadedPt);
		}
		SewisePlayerSkin.IVodSkin.loadedOpen = function(){
			controlBar.showBuffer();
		}
		SewisePlayerSkin.IVodSkin.loadedComplete = function(loadedPt){
			controlBar.hideBuffer();
		}

		SewisePlayerSkin.IVodSkin.programTitle = function(title){
			topBar.setTitle(title);
			
			//console.log("Title: " + title);
		}
		SewisePlayerSkin.IVodSkin.logo = function(url){
			logoBox.setLogo(url);
			
			//console.log("logo: " + url);
		}
		SewisePlayerSkin.IVodSkin.volume = function(value){
			//重置音量UI状态。
			controlBar.initVolume(value);
			
			//console.log("vod volume: " + value);
		}
		SewisePlayerSkin.IVodSkin.initialClarity = function(levels){
			clarityWindow.setControlBar(controlBar);
			//初始化多码率, name, videoUrl, id, selected.
			clarityWindow.initialClarities(levels);
			//console.log("vod levels: " + levels[0].name);
		}
		SewisePlayerSkin.IVodSkin.clarityButton = function(state){
			//重置clarityButton显示状态。
			if(state != "enable"){
				controlBar.hideClarityBtn();
			}
			//console.log("clarityButton: " + state);
		}
		SewisePlayerSkin.IVodSkin.timeDisplay = function(state){
			//重置playTime显示状态。
			/*if(state != "enable"){
			
			}*/
		}
		SewisePlayerSkin.IVodSkin.controlBarDisplay = function(state){
			//重置controlBar显示状态。
			if(state != "enable"){
				controlBar.hide2();
			}
		}
		SewisePlayerSkin.IVodSkin.topBarDisplay = function(state){
			//重置topBar显示状态。
			if(state != "enable"){
				topBar.hide2();
				controlBar.updateClarityBtnPosition();
			}
		}
		SewisePlayerSkin.IVodSkin.customStrings = function(strings){
			//customStrings值。
			
			//console.log("customStrings: " + strings);
		}
		SewisePlayerSkin.IVodSkin.customDatas = function(data){
			if(data){
				if(data["logoLink"]){
					logoBox.setLink(data["logoLink"]);
				}
			}
			//console.log(data);
		}
		SewisePlayerSkin.IVodSkin.fullScreen = function(){
			controlBar.fullScreen();
		}
		SewisePlayerSkin.IVodSkin.noramlScreen = function(){
			controlBar.noramlScreen();
		}
		SewisePlayerSkin.IVodSkin.initialAds = function(data){
			if(data){
				SewisePlayerSkin.AdsContainer(elementObject, data);
			}
			//console.log(data);
		}
		SewisePlayerSkin.IVodSkin.initialStatistics = function(data){
			if(data){
				SewisePlayerSkin.Statistics(data);
			}
			//console.log(data);
		}
		SewisePlayerSkin.IVodSkin.lang = function(lan){
			//en_US, zh_CN
			SewisePlayerSkin.Utils.language.init(lan);
			controlBar.initLanguage();
			topBar.initLanguage();
			
			//console.log(SewisePlayerSkin.Utils.language.getString("titleTip"));
		}
		
		
		//通知主播放器皮肤已经初始化完成.
		try{
			SewisePlayer.CommandDispatcher.dispatchEvent({type: SewisePlayer.Events.PLAYER_SKIN_LOADED, playerSkin: SewisePlayerSkin.IVodSkin});
		}catch(e){
			console.log("No Main Player");
			
			//alert("No Main Player");
		}
		
		//$(".sewise-player-ui").css("visibility", "hidden");
		
	})

})(window, window.jQuery);