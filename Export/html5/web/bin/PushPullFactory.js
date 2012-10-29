(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var ApplicationMain = function() { }
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = ["ApplicationMain"];
ApplicationMain.main = function() {
	ApplicationMain.completed = 0;
	ApplicationMain.loaders = new Hash();
	ApplicationMain.urlLoaders = new Hash();
	ApplicationMain.total = 0;
	ApplicationMain.preloader = new NMEPreloader();
	nme.Lib.nmeGetCurrent().addChild(ApplicationMain.preloader);
	ApplicationMain.preloader.onInit();
	if(ApplicationMain.total == 0) ApplicationMain.begin(); else {
		var $it0 = ApplicationMain.loaders.keys();
		while( $it0.hasNext() ) {
			var path = $it0.next();
			var loader = ApplicationMain.loaders.get(path);
			loader.contentLoaderInfo.addEventListener("complete",ApplicationMain.loader_onComplete);
			loader.load(new jeash.net.URLRequest(path));
		}
		var $it1 = ApplicationMain.urlLoaders.keys();
		while( $it1.hasNext() ) {
			var path = $it1.next();
			var urlLoader = ApplicationMain.urlLoaders.get(path);
			urlLoader.addEventListener("complete",ApplicationMain.loader_onComplete);
			urlLoader.load(new jeash.net.URLRequest(path));
		}
	}
}
ApplicationMain.begin = function() {
	ApplicationMain.preloader.addEventListener(jeash.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	ApplicationMain.preloader.onLoaded();
}
ApplicationMain.loader_onComplete = function(event) {
	ApplicationMain.completed++;
	ApplicationMain.preloader.onUpdate(ApplicationMain.completed,ApplicationMain.total);
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
}
ApplicationMain.preloader_onComplete = function(event) {
	ApplicationMain.preloader.removeEventListener(jeash.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	nme.Lib.nmeGetCurrent().removeChild(ApplicationMain.preloader);
	ApplicationMain.preloader = null;
	if(Reflect.field(PushPullFactory,"main") == null) {
		var mainDisplayObj = new PushPullFactory();
		if(js.Boot.__instanceof(mainDisplayObj,jeash.display.DisplayObject)) nme.Lib.nmeGetCurrent().addChild(mainDisplayObj);
	} else Reflect.field(PushPullFactory,"main").apply(PushPullFactory,[]);
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
}
var Hash = function() {
	this.h = { };
};
$hxClasses["Hash"] = Hash;
Hash.__name__ = ["Hash"];
Hash.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: Hash
}
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IntHash = function() {
	this.h = { };
};
$hxClasses["IntHash"] = IntHash;
IntHash.__name__ = ["IntHash"];
IntHash.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: IntHash
}
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
var jeash = {}
jeash.events = {}
jeash.events.IEventDispatcher = function() { }
$hxClasses["jeash.events.IEventDispatcher"] = jeash.events.IEventDispatcher;
jeash.events.IEventDispatcher.__name__ = ["jeash","events","IEventDispatcher"];
jeash.events.IEventDispatcher.prototype = {
	__class__: jeash.events.IEventDispatcher
}
jeash.events.EventDispatcher = function(target) {
	if(target != null) this.jeashTarget = target; else this.jeashTarget = this;
	this.jeashEventMap = [];
};
$hxClasses["jeash.events.EventDispatcher"] = jeash.events.EventDispatcher;
jeash.events.EventDispatcher.__name__ = ["jeash","events","EventDispatcher"];
jeash.events.EventDispatcher.__interfaces__ = [jeash.events.IEventDispatcher];
jeash.events.EventDispatcher.compareListeners = function(l1,l2) {
	return l1.mPriority == l2.mPriority?0:l1.mPriority > l2.mPriority?-1:1;
}
jeash.events.EventDispatcher.prototype = {
	willTrigger: function(type) {
		return this.hasEventListener(type);
	}
	,toString: function() {
		return "[ " + this.__name__ + " ]";
	}
	,removeEventListener: function(type,listener,inCapture) {
		if(!this.existList(type)) return;
		var list = this.getList(type);
		var capture = inCapture == null?false:inCapture;
		var _g1 = 0, _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].Is(listener,capture)) {
				list.splice(i,1);
				return;
			}
		}
	}
	,hasEventListener: function(type) {
		return this.existList(type);
	}
	,dispatchEvent: function(event) {
		if(event.target == null) event.target = this.jeashTarget;
		var capture = event.eventPhase == jeash.events.EventPhase.CAPTURING_PHASE;
		if(this.existList(event.type)) {
			var list = this.getList(event.type);
			var idx = 0;
			while(idx < list.length) {
				var listener = list[idx];
				if(listener.mUseCapture == capture) {
					listener.dispatchEvent(event);
					if(event.jeashGetIsCancelledNow()) return true;
				}
				if(idx < list.length && listener != list[idx]) {
				} else idx++;
			}
			return true;
		}
		return false;
	}
	,addEventListener: function(type,inListener,useCapture,inPriority,useWeakReference) {
		var capture = useCapture == null?false:useCapture;
		var priority = inPriority == null?0:inPriority;
		var list = this.getList(type);
		if(!this.existList(type)) {
			list = [];
			this.setList(type,list);
		}
		list.push(new jeash.events.Listener(inListener,capture,priority));
		list.sort(jeash.events.EventDispatcher.compareListeners);
	}
	,existList: function(type) {
		return this.jeashEventMap[type] != undefined;
	}
	,setList: function(type,list) {
		this.jeashEventMap[type] = list;
	}
	,getList: function(type) {
		return this.jeashEventMap[type];
	}
	,__class__: jeash.events.EventDispatcher
}
jeash.display = {}
jeash.display.IBitmapDrawable = function() { }
$hxClasses["jeash.display.IBitmapDrawable"] = jeash.display.IBitmapDrawable;
jeash.display.IBitmapDrawable.__name__ = ["jeash","display","IBitmapDrawable"];
jeash.display.IBitmapDrawable.prototype = {
	__class__: jeash.display.IBitmapDrawable
}
jeash.display.DisplayObject = function() {
	jeash.events.EventDispatcher.call(this,null);
	this._jeashId = jeash.utils.Uuid.uuid();
	this.jeashSetParent(null);
	this.setTransform(new jeash.geom.Transform(this));
	this.jeashX = this.jeashY = 0.0;
	this.jeashScaleX = this.jeashScaleY = 1.0;
	this.jeashRotation = 0.0;
	this.jeashWidth = this.jeashHeight = 0.0;
	this.jeashSetVisible(true);
	this.alpha = 1.0;
	this.jeashFilters = new Array();
	this.jeashBoundsRect = new jeash.geom.Rectangle();
	this.jeashScrollRect = null;
	this.jeashMask = null;
	this.jeashMaskingObj = null;
};
$hxClasses["jeash.display.DisplayObject"] = jeash.display.DisplayObject;
jeash.display.DisplayObject.__name__ = ["jeash","display","DisplayObject"];
jeash.display.DisplayObject.__interfaces__ = [jeash.display.IBitmapDrawable];
jeash.display.DisplayObject.__super__ = jeash.events.EventDispatcher;
jeash.display.DisplayObject.prototype = $extend(jeash.events.EventDispatcher.prototype,{
	jeashInvalidateBounds: function() {
		this._jeashRenderFlags |= 64;
		if(this.parent != null) this.parent._jeashRenderFlags |= 64;
	}
	,getBoundsInvalid: function() {
		var gfx = this.jeashGetGraphics();
		if(gfx == null) return (this._jeashRenderFlags & 64) != 0; else return (this._jeashRenderFlags & 64) != 0 || gfx.boundsDirty;
	}
	,validateBounds: function() {
		if(this.getBoundsInvalid()) {
			var gfx = this.jeashGetGraphics();
			if(gfx == null) {
				this.jeashBoundsRect.x = this.jeashGetX();
				this.jeashBoundsRect.y = this.jeashGetY();
				this.jeashBoundsRect.width = 0;
				this.jeashBoundsRect.height = 0;
			} else {
				this.jeashBoundsRect = gfx.jeashExtent.clone();
				if(this.scale9Grid != null) {
					this.jeashBoundsRect.width *= this.jeashScaleX;
					this.jeashBoundsRect.height *= this.jeashScaleY;
					this.jeashWidth = this.jeashBoundsRect.width;
					this.jeashHeight = this.jeashBoundsRect.height;
				} else {
					this.jeashWidth = this.jeashBoundsRect.width * this.jeashScaleX;
					this.jeashHeight = this.jeashBoundsRect.height * this.jeashScaleY;
				}
				gfx.boundsDirty = false;
			}
			this._jeashRenderFlags &= -65;
		}
	}
	,jeashUnifyChildrenWithDOM: function(lastMoveGfx) {
		var gfx = this.jeashGetGraphics();
		if(gfx != null && lastMoveGfx != null) jeash.Lib.jeashSetSurfaceZIndexAfter(gfx.jeashSurface,lastMoveGfx.jeashSurface);
	}
	,jeashSetRotation: function(inValue) {
		if(this.jeashRotation != inValue) {
			this.jeashRotation = inValue;
			this.jeashInvalidateMatrix(true);
			this._jeashRenderFlags |= 64;
			if(this.parent != null) this.parent._jeashRenderFlags |= 64;
		}
		return inValue;
	}
	,jeashGetRotation: function() {
		return this.jeashRotation;
	}
	,jeashSetScaleY: function(inValue) {
		if(this.jeashScaleY != inValue) {
			this.jeashScaleY = inValue;
			this.jeashInvalidateMatrix(true);
			this._jeashRenderFlags |= 64;
			if(this.parent != null) this.parent._jeashRenderFlags |= 64;
		}
		return inValue;
	}
	,jeashGetScaleY: function() {
		return this.jeashScaleY;
	}
	,jeashSetScaleX: function(inValue) {
		if(this.jeashScaleX != inValue) {
			this.jeashScaleX = inValue;
			this.jeashInvalidateMatrix(true);
			this._jeashRenderFlags |= 64;
			if(this.parent != null) this.parent._jeashRenderFlags |= 64;
		}
		return inValue;
	}
	,jeashGetScaleX: function() {
		return this.jeashScaleX;
	}
	,jeashSetY: function(inValue) {
		if(this.jeashY != inValue) {
			this.jeashY = inValue;
			this.jeashInvalidateMatrix(true);
			if(this.parent != null) this.parent.jeashInvalidateBounds();
		}
		return inValue;
	}
	,jeashGetY: function() {
		return this.jeashY;
	}
	,jeashSetX: function(inValue) {
		if(this.jeashX != inValue) {
			this.jeashX = inValue;
			this.jeashInvalidateMatrix(true);
			if(this.parent != null) this.parent.jeashInvalidateBounds();
		}
		return inValue;
	}
	,jeashGetX: function() {
		return this.jeashX;
	}
	,jeashSetHeight: function(inValue) {
		if(this.getBoundsInvalid()) this.validateBounds();
		var h = this.jeashBoundsRect.height;
		if(this.jeashScaleY * h != inValue) {
			if(h <= 0) return 0;
			this.jeashScaleY = inValue / h;
			this.jeashInvalidateMatrix(true);
			this._jeashRenderFlags |= 64;
			if(this.parent != null) this.parent._jeashRenderFlags |= 64;
		}
		return inValue;
	}
	,jeashGetHeight: function() {
		if(this.getBoundsInvalid()) this.validateBounds();
		return this.jeashHeight;
	}
	,jeashSetWidth: function(inValue) {
		if(this.getBoundsInvalid()) this.validateBounds();
		var w = this.jeashBoundsRect.width;
		if(this.jeashScaleX * w != inValue) {
			if(w <= 0) return 0;
			this.jeashScaleX = inValue / w;
			this.jeashInvalidateMatrix(true);
			this._jeashRenderFlags |= 64;
			if(this.parent != null) this.parent._jeashRenderFlags |= 64;
		}
		return inValue;
	}
	,jeashGetWidth: function() {
		if(this.getBoundsInvalid()) this.validateBounds();
		return this.jeashWidth;
	}
	,jeashSetVisible: function(inValue) {
		var gfx = this.jeashGetGraphics();
		if(gfx != null && gfx.jeashSurface != null) jeash.Lib.jeashSetSurfaceVisible(gfx.jeashSurface,inValue);
		this.jeashVisible = inValue;
		return this.jeashGetVisible();
	}
	,jeashGetVisible: function() {
		return this.jeashVisible;
	}
	,jeashRemoveFromStage: function() {
		var gfx = this.jeashGetGraphics();
		if(gfx != null && jeash.Lib.jeashIsOnStage(gfx.jeashSurface)) {
			jeash.Lib.jeashRemoveSurface(gfx.jeashSurface);
			var evt = new jeash.events.Event(jeash.events.Event.REMOVED_FROM_STAGE,false,false);
			this.dispatchEvent(evt);
		}
	}
	,jeashAddToStage: function(newParent,beforeSibling) {
		var wasOnStage = this.getStage() != null;
		var gfx = this.jeashGetGraphics();
		if(gfx == null) throw Std.string(this) + " tried to add to stage with null graphics context";
		if(newParent.jeashGetGraphics() != null) {
			jeash.Lib.jeashSetSurfaceId(gfx.jeashSurface,this._jeashId);
			if(beforeSibling != null && beforeSibling.jeashGetGraphics() != null) jeash.Lib.jeashAppendSurface(gfx.jeashSurface,beforeSibling.jeashGetGraphics().jeashSurface); else {
				var stageChildren = [];
				var _g = 0, _g1 = newParent.jeashChildren;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					if(child.getStage() != null) stageChildren.push(child);
				}
				if(stageChildren.length < 1) jeash.Lib.jeashAppendSurface(gfx.jeashSurface,null,newParent.jeashGetGraphics().jeashSurface); else {
					var nextSibling = stageChildren[stageChildren.length - 1];
					var container;
					while(js.Boot.__instanceof(nextSibling,jeash.display.DisplayObjectContainer)) {
						container = js.Boot.__cast(nextSibling , jeash.display.DisplayObjectContainer);
						if(container.jeashChildren.length > 0) nextSibling = container.jeashChildren[container.jeashChildren.length - 1]; else break;
					}
					if(nextSibling.jeashGetGraphics() != gfx) jeash.Lib.jeashAppendSurface(gfx.jeashSurface,null,nextSibling.jeashGetGraphics().jeashSurface); else jeash.Lib.jeashAppendSurface(gfx.jeashSurface);
				}
			}
		} else if(newParent.name == "Stage") jeash.Lib.jeashAppendSurface(gfx.jeashSurface);
		if(!wasOnStage && this.getStage() != null) {
			var evt = new jeash.events.Event(jeash.events.Event.ADDED_TO_STAGE,false,false);
			this.dispatchEvent(evt);
		}
	}
	,dispatchEvent: function(event) {
		var result = this.jeashDispatchEvent(event);
		if(event.jeashGetIsCancelled()) return true;
		if(event.bubbles && this.parent != null) this.parent.dispatchEvent(event);
		return result;
	}
	,jeashDispatchEvent: function(event) {
		if(event.target == null) event.target = this;
		event.currentTarget = this;
		return jeash.events.EventDispatcher.prototype.dispatchEvent.call(this,event);
	}
	,jeashBroadcast: function(event) {
		this.jeashDispatchEvent(event);
	}
	,jeashFireEvent: function(event) {
		var stack = [];
		if(this.parent != null) this.parent.jeashGetInteractiveObjectStack(stack);
		var l = stack.length;
		if(l > 0) {
			event.jeashSetPhase(jeash.events.EventPhase.CAPTURING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				event.currentTarget = obj;
				obj.jeashDispatchEvent(event);
				if(event.jeashGetIsCancelled()) return;
			}
		}
		event.jeashSetPhase(jeash.events.EventPhase.AT_TARGET);
		event.currentTarget = this;
		this.jeashDispatchEvent(event);
		if(event.jeashGetIsCancelled()) return;
		if(event.bubbles) {
			event.jeashSetPhase(jeash.events.EventPhase.BUBBLING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				event.currentTarget = obj;
				obj.jeashDispatchEvent(event);
				if(event.jeashGetIsCancelled()) return;
			}
		}
	}
	,jeashGetInteractiveObjectStack: function(outStack) {
		var io = this;
		if(io != null) outStack.push(io);
		if(this.parent != null) this.parent.jeashGetInteractiveObjectStack(outStack);
	}
	,jeashGetFilters: function() {
		if(this.jeashFilters == null) return [];
		var result = new Array();
		var _g = 0, _g1 = this.jeashFilters;
		while(_g < _g1.length) {
			var filter = _g1[_g];
			++_g;
			result.push(filter.clone());
		}
		return result;
	}
	,invalidateGraphics: function() {
		var gfx = this.jeashGetGraphics();
		if(gfx != null) gfx.jeashChanged = gfx.jeashClearNextCycle = true;
	}
	,jeashSetFilters: function(filters) {
		var oldFilterCount = this.jeashFilters == null?0:this.jeashFilters.length;
		if(filters == null) {
			this.jeashFilters = null;
			if(oldFilterCount > 0) this.invalidateGraphics();
		} else {
			this.jeashFilters = new Array();
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				this.jeashFilters.push(filter.clone());
			}
			this.invalidateGraphics();
		}
		return filters;
	}
	,setMask: function(inValue) {
		if(this.jeashMask != null) this.jeashMask.jeashMaskingObj = null;
		this.jeashMask = inValue;
		if(this.jeashMask != null) this.jeashMask.jeashMaskingObj = this;
		return this.jeashMask;
	}
	,getMask: function() {
		return this.jeashMask;
	}
	,jeashGetObjectUnderPoint: function(point) {
		if(!this.jeashGetVisible()) return null;
		var gfx = this.jeashGetGraphics();
		if(gfx != null) {
			var extX = gfx.jeashExtent.x;
			var extY = gfx.jeashExtent.y;
			var local = this.globalToLocal(point);
			if(local.x - extX < 0 || local.y - extY < 0 || (local.x - extX) * this.jeashGetScaleX() > this.jeashGetWidth() || (local.y - extY) * this.jeashGetScaleY() > this.jeashGetHeight()) return null;
			switch( (this.getStage().jeashPointInPathMode)[1] ) {
			case 0:
				if(gfx.jeashHitTest(local.x,local.y)) return this;
				break;
			case 1:
				if(gfx.jeashHitTest(local.x * this.jeashGetScaleX(),local.y * this.jeashGetScaleY())) return this;
				break;
			}
		}
		return null;
	}
	,drawToSurface: function(inSurface,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		var oldAlpha = this.alpha;
		this.alpha = 1;
		this.jeashRender();
		this.alpha = oldAlpha;
		var surfaceCopy = jeash.display.BitmapData.jeashCopySurface(this.jeashGetSurface());
		jeash.display.BitmapData.jeashColorTransformSurface(surfaceCopy,inColorTransform);
		jeash.Lib.jeashDrawToSurface(surfaceCopy,inSurface,matrix);
	}
	,getSurfaceTransform: function(gfx) {
		var extent = gfx.jeashExtentWithFilters;
		var fm = this.transform.jeashGetFullMatrix(null);
		fm.jeashTranslateTransformed(extent.get_topLeft());
		return fm;
	}
	,jeashRender: function(inMask,clipRect) {
		if(!this.jeashVisible) return;
		var gfx = this.jeashGetGraphics();
		if(gfx == null) return;
		if((this._jeashRenderFlags & 4) != 0 || (this._jeashRenderFlags & 8) != 0) this.jeashValidateMatrix();
		if(gfx.jeashRender(inMask,this.jeashFilters,1,1)) {
			this._jeashRenderFlags |= 64;
			if(this.parent != null) this.parent._jeashRenderFlags |= 64;
			this.jeashApplyFilters(gfx.jeashSurface);
			this._jeashRenderFlags |= 32;
		}
		var fullAlpha = (this.parent != null?this.parent.alpha:1) * this.alpha;
		if(inMask != null) {
			var m = this.getSurfaceTransform(gfx);
			jeash.Lib.jeashDrawToSurface(gfx.jeashSurface,inMask,m,fullAlpha,clipRect);
		} else {
			if((this._jeashRenderFlags & 32) != 0) {
				var m = this.getSurfaceTransform(gfx);
				jeash.Lib.jeashSetSurfaceTransform(gfx.jeashSurface,m);
				this._jeashRenderFlags &= -33;
			}
			if(fullAlpha != this._lastFullAlpha) {
				jeash.Lib.jeashSetSurfaceOpacity(gfx.jeashSurface,fullAlpha);
				this._lastFullAlpha = fullAlpha;
			}
		}
	}
	,jeashApplyFilters: function(surface) {
		if(this.jeashFilters != null) {
			var _g = 0, _g1 = this.jeashFilters;
			while(_g < _g1.length) {
				var filter = _g1[_g];
				++_g;
				filter.jeashApplyFilter(surface);
			}
		}
	}
	,jeashValidateMatrix: function() {
		var parentMatrixInvalid = (this._jeashRenderFlags & 8) != 0 && this.parent != null;
		if((this._jeashRenderFlags & 4) != 0 || parentMatrixInvalid) {
			if(parentMatrixInvalid) this.parent.jeashValidateMatrix();
			var m = this.transform.getMatrix();
			if((this._jeashRenderFlags & 16) != 0) this._jeashRenderFlags &= -5;
			if((this._jeashRenderFlags & 4) != 0) {
				m.identity();
				m.scale(this.jeashScaleX,this.jeashScaleY);
				var rad = this.jeashRotation * (Math.PI / 180.0);
				if(rad != 0.0) m.rotate(rad);
				m.translate(this.jeashX,this.jeashY);
				this.transform._matrix.copy(m);
				m;
			}
			var cm = this.transform.jeashGetFullMatrix(null);
			var fm = this.parent == null?m:this.parent.transform.jeashGetFullMatrix(m);
			this._fullScaleX = fm._sx;
			this._fullScaleY = fm._sy;
			if(cm.a != fm.a || cm.b != fm.b || cm.c != fm.c || cm.d != fm.d || cm.tx != fm.tx || cm.ty != fm.ty) {
				this.transform.jeashSetFullMatrix(fm);
				this._jeashRenderFlags |= 32;
			}
			this._jeashRenderFlags &= -29;
		}
	}
	,jeashMatrixOverridden: function() {
		this._jeashRenderFlags |= 16;
		this._jeashRenderFlags |= 4;
		this._jeashRenderFlags |= 64;
		if(this.parent != null) this.parent._jeashRenderFlags |= 64;
	}
	,jeashInvalidateMatrix: function(local) {
		if(local == null) local = false;
		if(local) this._jeashRenderFlags |= 4; else this._jeashRenderFlags |= 8;
	}
	,jeashGetSurface: function() {
		var gfx = this.jeashGetGraphics();
		var surface = null;
		if(gfx != null) surface = gfx.jeashSurface;
		return surface;
	}
	,jeashGetGraphics: function() {
		return null;
	}
	,globalToLocal: function(inPos) {
		if((this._jeashRenderFlags & 4) != 0 || (this._jeashRenderFlags & 8) != 0) this.jeashValidateMatrix();
		return this.transform.jeashGetFullMatrix(null).invert().transformPoint(inPos);
	}
	,getBounds: function(targetCoordinateSpace) {
		if((this._jeashRenderFlags & 4) != 0 || (this._jeashRenderFlags & 8) != 0) this.jeashValidateMatrix();
		if(this.getBoundsInvalid()) this.validateBounds();
		var m = this.transform.jeashGetFullMatrix(null);
		if(targetCoordinateSpace != null) m.concat(targetCoordinateSpace.transform.jeashGetFullMatrix(null).invert());
		var rect = this.jeashBoundsRect.transform(m);
		return rect;
	}
	,setTransform: function(inValue) {
		this.transform = inValue;
		this.jeashInvalidateMatrix(true);
		return inValue;
	}
	,jeashGetMouseY: function() {
		return this.globalToLocal(new jeash.geom.Point(0,this.getStage().jeashGetMouseY())).y;
	}
	,jeashGetMouseX: function() {
		return this.globalToLocal(new jeash.geom.Point(this.getStage().jeashGetMouseX(),0)).x;
	}
	,setScrollRect: function(inValue) {
		this.jeashScrollRect = inValue;
		return inValue;
	}
	,getScrollRect: function() {
		if(this.jeashScrollRect == null) return null;
		return this.jeashScrollRect.clone();
	}
	,getStage: function() {
		var gfx = this.jeashGetGraphics();
		if(gfx != null && jeash.Lib.jeashIsOnStage(gfx.jeashSurface)) return jeash.Lib.jeashGetStage();
		return null;
	}
	,jeashSetParent: function(inValue) {
		if(inValue == this.parent) return inValue;
		this.jeashInvalidateMatrix();
		if(this.parent != null) {
			HxOverrides.remove(this.parent.jeashChildren,this);
			this.parent.jeashInvalidateBounds();
		}
		if(inValue != null) {
			inValue._jeashRenderFlags |= 64;
			if(inValue.parent != null) inValue.parent._jeashRenderFlags |= 64;
		}
		if(this.parent == null && inValue != null) {
			this.parent = inValue;
			var evt = new jeash.events.Event(jeash.events.Event.ADDED,true,false);
			this.dispatchEvent(evt);
		} else if(this.parent != null && inValue == null) {
			this.parent = inValue;
			var evt = new jeash.events.Event(jeash.events.Event.REMOVED,true,false);
			this.dispatchEvent(evt);
		} else this.parent = inValue;
		return inValue;
	}
	,toString: function() {
		return "[DisplayObject name=" + this.name + " id=" + this._jeashId + "]";
	}
	,__class__: jeash.display.DisplayObject
});
jeash.display.InteractiveObject = function() {
	jeash.display.DisplayObject.call(this);
	this.tabEnabled = false;
	this.mouseEnabled = true;
	this.doubleClickEnabled = true;
	this.jeashSetTabIndex(0);
};
$hxClasses["jeash.display.InteractiveObject"] = jeash.display.InteractiveObject;
jeash.display.InteractiveObject.__name__ = ["jeash","display","InteractiveObject"];
jeash.display.InteractiveObject.__super__ = jeash.display.DisplayObject;
jeash.display.InteractiveObject.prototype = $extend(jeash.display.DisplayObject.prototype,{
	jeashGetObjectUnderPoint: function(point) {
		if(!this.mouseEnabled) return null; else return jeash.display.DisplayObject.prototype.jeashGetObjectUnderPoint.call(this,point);
	}
	,jeashSetTabIndex: function(inIndex) {
		this.jeashTabIndex = inIndex;
		return inIndex;
	}
	,jeashGetTabIndex: function() {
		return this.jeashTabIndex;
	}
	,toString: function() {
		return "[InteractiveObject name=" + this.name + " id=" + this._jeashId + "]";
	}
	,__class__: jeash.display.InteractiveObject
});
jeash.display.DisplayObjectContainer = function() {
	this.jeashChildren = new Array();
	this.mouseChildren = true;
	this.tabChildren = true;
	jeash.display.InteractiveObject.call(this);
};
$hxClasses["jeash.display.DisplayObjectContainer"] = jeash.display.DisplayObjectContainer;
jeash.display.DisplayObjectContainer.__name__ = ["jeash","display","DisplayObjectContainer"];
jeash.display.DisplayObjectContainer.__super__ = jeash.display.InteractiveObject;
jeash.display.DisplayObjectContainer.prototype = $extend(jeash.display.InteractiveObject.prototype,{
	jeashSetVisible: function(visible) {
		jeash.display.InteractiveObject.prototype.jeashSetVisible.call(this,visible);
		var _g = 0, _g1 = this.jeashChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.getStage() != null) child.jeashSetVisible(visible);
		}
		return visible;
	}
	,jeashSetFilters: function(filters) {
		jeash.display.InteractiveObject.prototype.jeashSetFilters.call(this,filters);
		var _g = 0, _g1 = this.jeashChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.jeashSetFilters(filters);
		}
		return filters;
	}
	,jeashGetObjectUnderPoint: function(point) {
		if(!this.jeashGetVisible()) return null;
		var l = this.jeashChildren.length - 1;
		var _g1 = 0, _g = this.jeashChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			var result = this.jeashChildren[l - i].jeashGetObjectUnderPoint(point);
			if(result != null) return this.mouseChildren?result:this;
		}
		return jeash.display.InteractiveObject.prototype.jeashGetObjectUnderPoint.call(this,point);
	}
	,jeashUnifyChildrenWithDOM: function(lastMoveGfx) {
		var gfx1 = this.jeashGetGraphics();
		if(gfx1 != null) {
			lastMoveGfx = gfx1;
			var _g = 0, _g1 = this.jeashChildren;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				var gfx2 = child.jeashGetGraphics();
				if(gfx2 != null) {
					jeash.Lib.jeashSetSurfaceZIndexAfter(gfx2.jeashSurface,lastMoveGfx.jeashSurface);
					lastMoveGfx = gfx2;
				}
				child.jeashUnifyChildrenWithDOM(lastMoveGfx);
			}
		}
	}
	,swapChildren: function(child1,child2) {
		var c1 = -1;
		var c2 = -1;
		var swap;
		var _g1 = 0, _g = this.jeashChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.jeashChildren[i] == child1) c1 = i; else if(this.jeashChildren[i] == child2) c2 = i;
		}
		if(c1 != -1 && c2 != -1) {
			swap = this.jeashChildren[c1];
			this.jeashChildren[c1] = this.jeashChildren[c2];
			this.jeashChildren[c2] = swap;
			swap = null;
			this.jeashSwapSurface(c1,c2);
		}
	}
	,jeashSwapSurface: function(c1,c2) {
		if(this.jeashChildren[c1] == null) throw "Null element at index " + c1 + " length " + this.jeashChildren.length;
		if(this.jeashChildren[c2] == null) throw "Null element at index " + c2 + " length " + this.jeashChildren.length;
		var gfx1 = this.jeashChildren[c1].jeashGetGraphics();
		var gfx2 = this.jeashChildren[c2].jeashGetGraphics();
		if(gfx1 != null && gfx2 != null) jeash.Lib.jeashSwapSurface(gfx1.jeashSurface,gfx2.jeashSurface);
	}
	,setChildIndex: function(child,index) {
		if(index > this.jeashChildren.length) throw "Invalid index position " + index;
		var oldIndex = this.getChildIndex(child);
		if(oldIndex < 0) {
			var msg = "setChildIndex : object " + child.name + " not found.";
			if(child.parent == this) {
				var realindex = -1;
				var _g1 = 0, _g = this.jeashChildren.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(this.jeashChildren[i] == child) {
						realindex = i;
						break;
					}
				}
				if(realindex != -1) msg += "Internal error: Real child index was " + Std.string(realindex); else msg += "Internal error: Child was not in jeashChildren array!";
			}
			throw msg;
		}
		if(index < oldIndex) {
			var i = oldIndex;
			while(i > index) {
				this.swapChildren(this.jeashChildren[i],this.jeashChildren[i - 1]);
				i--;
			}
		} else if(oldIndex < index) {
			var i = oldIndex;
			while(i < index) {
				this.swapChildren(this.jeashChildren[i],this.jeashChildren[i + 1]);
				i++;
			}
		}
	}
	,removeChild: function(inChild) {
		var _g = 0, _g1 = this.jeashChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child == inChild) return (function($this) {
				var $r;
				child.jeashRemoveFromStage();
				child.jeashSetParent(null);
				$r = child;
				return $r;
			}(this));
		}
		throw "removeChild : none found?";
	}
	,getChildIndex: function(inChild) {
		var _g1 = 0, _g = this.jeashChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.jeashChildren[i] == inChild) return i;
		}
		return -1;
	}
	,addChild: function(object) {
		if(object == null) throw "DisplayObjectContainer asked to add null child object";
		if(object == this) throw "Adding to self";
		if(object.parent == this) {
			this.setChildIndex(object,this.jeashChildren.length - 1);
			return object;
		}
		object.jeashSetParent(this);
		if(this.getStage() != null) object.jeashAddToStage(this);
		this.jeashChildren.push(object);
		return object;
	}
	,jeashRemoveFromStage: function() {
		jeash.display.InteractiveObject.prototype.jeashRemoveFromStage.call(this);
		var _g = 0, _g1 = this.jeashChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.jeashRemoveFromStage();
		}
	}
	,jeashAddToStage: function(newParent,beforeSibling) {
		jeash.display.InteractiveObject.prototype.jeashAddToStage.call(this,newParent,beforeSibling);
		var _g = 0, _g1 = this.jeashChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.getStage() == null) child.jeashAddToStage(this);
		}
	}
	,jeashRender: function(inMask,clipRect) {
		if(!this.jeashVisible) return;
		if(clipRect == null && this.jeashScrollRect != null) clipRect = this.jeashScrollRect;
		jeash.display.InteractiveObject.prototype.jeashRender.call(this,inMask,clipRect);
		var _g = 0, _g1 = this.jeashChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.jeashVisible) {
				if(clipRect != null) {
					if((child._jeashRenderFlags & 4) != 0 || (child._jeashRenderFlags & 8) != 0) {
						child.invalidateGraphics();
						child.jeashValidateMatrix();
					}
				}
				child.jeashRender(inMask,clipRect);
			}
		}
	}
	,jeashInvalidateMatrix: function(local) {
		if(local == null) local = false;
		if(!((this._jeashRenderFlags & 8) != 0) && !((this._jeashRenderFlags & 4) != 0)) {
			var _g = 0, _g1 = this.jeashChildren;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.jeashInvalidateMatrix();
			}
		}
		jeash.display.InteractiveObject.prototype.jeashInvalidateMatrix.call(this,local);
	}
	,validateBounds: function() {
		if(this.getBoundsInvalid()) {
			jeash.display.InteractiveObject.prototype.validateBounds.call(this);
			var _g = 0, _g1 = this.jeashChildren;
			while(_g < _g1.length) {
				var obj = _g1[_g];
				++_g;
				if(obj.jeashGetVisible()) {
					var r = obj.getBounds(this);
					if(r.width != 0 || r.height != 0) {
						if(this.jeashBoundsRect.width == 0 && this.jeashBoundsRect.height == 0) this.jeashBoundsRect = r.clone(); else this.jeashBoundsRect.extendBounds(r);
					}
				}
			}
			if(this.scale9Grid != null) {
				this.jeashBoundsRect.width *= this.jeashScaleX;
				this.jeashBoundsRect.height *= this.jeashScaleY;
				this.jeashWidth = this.jeashBoundsRect.width;
				this.jeashHeight = this.jeashBoundsRect.height;
			} else {
				this.jeashWidth = this.jeashBoundsRect.width * this.jeashScaleX;
				this.jeashHeight = this.jeashBoundsRect.height * this.jeashScaleY;
			}
		}
	}
	,jeashBroadcast: function(event) {
		var _g = 0, _g1 = this.jeashChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.jeashBroadcast(event);
		}
		this.dispatchEvent(event);
	}
	,toString: function() {
		return "[DisplayObjectContainer name=" + this.name + " id=" + this._jeashId + "]";
	}
	,__class__: jeash.display.DisplayObjectContainer
});
jeash.display.Sprite = function() {
	jeash.display.DisplayObjectContainer.call(this);
	this.jeashGraphics = new jeash.display.Graphics();
	this.buttonMode = false;
};
$hxClasses["jeash.display.Sprite"] = jeash.display.Sprite;
jeash.display.Sprite.__name__ = ["jeash","display","Sprite"];
jeash.display.Sprite.__super__ = jeash.display.DisplayObjectContainer;
jeash.display.Sprite.prototype = $extend(jeash.display.DisplayObjectContainer.prototype,{
	jeashGetDropTarget: function() {
		return this.jeashDropTarget;
	}
	,jeashSetUseHandCursor: function(cursor) {
		if(cursor == this.useHandCursor) return cursor;
		if(this.jeashCursorCallbackOver != null) this.removeEventListener(jeash.events.MouseEvent.ROLL_OVER,this.jeashCursorCallbackOver);
		if(this.jeashCursorCallbackOut != null) this.removeEventListener(jeash.events.MouseEvent.ROLL_OUT,this.jeashCursorCallbackOut);
		if(!cursor) jeash.Lib.jeashSetCursor(jeash._Lib.CursorType.Default); else {
			this.jeashCursorCallbackOver = function(_) {
				jeash.Lib.jeashSetCursor(jeash._Lib.CursorType.Pointer);
			};
			this.jeashCursorCallbackOut = function(_) {
				jeash.Lib.jeashSetCursor(jeash._Lib.CursorType.Default);
			};
			this.addEventListener(jeash.events.MouseEvent.ROLL_OVER,this.jeashCursorCallbackOver);
			this.addEventListener(jeash.events.MouseEvent.ROLL_OUT,this.jeashCursorCallbackOut);
		}
		this.useHandCursor = cursor;
		return cursor;
	}
	,jeashGetGraphics: function() {
		return this.jeashGraphics;
	}
	,toString: function() {
		return "[Sprite name=" + this.name + " id=" + this._jeashId + "]";
	}
	,__class__: jeash.display.Sprite
});
var NMEPreloader = function() {
	jeash.display.Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 9;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 3;
	this.outline = new jeash.display.Sprite();
	this.outline.jeashGetGraphics().lineStyle(1,color,0.15,true);
	this.outline.jeashGetGraphics().drawRoundRect(0,0,width,height,padding * 2,padding * 2);
	this.outline.jeashSetX(x);
	this.outline.jeashSetY(y);
	this.addChild(this.outline);
	this.progress = new jeash.display.Sprite();
	this.progress.jeashGetGraphics().beginFill(color,0.35);
	this.progress.jeashGetGraphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.jeashSetX(x + padding);
	this.progress.jeashSetY(y + padding);
	this.progress.jeashSetScaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = ["NMEPreloader"];
NMEPreloader.__super__ = jeash.display.Sprite;
NMEPreloader.prototype = $extend(jeash.display.Sprite.prototype,{
	onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded == 1;
		this.progress.jeashSetScaleX(percentLoaded);
	}
	,onLoaded: function() {
		this.dispatchEvent(new jeash.events.Event(jeash.events.Event.COMPLETE));
	}
	,onInit: function() {
	}
	,getWidth: function() {
		return 640;
	}
	,getHeight: function() {
		return 480;
	}
	,getBackgroundColor: function() {
		return 0;
	}
	,__class__: NMEPreloader
});
var PushPullFactory = function() {
	jeash.display.Sprite.call(this);
	this.initialize();
};
$hxClasses["PushPullFactory"] = PushPullFactory;
PushPullFactory.__name__ = ["PushPullFactory"];
PushPullFactory.__super__ = jeash.display.Sprite;
PushPullFactory.prototype = $extend(jeash.display.Sprite.prototype,{
	makeBackground: function() {
		var background = new jeash.display.Sprite();
		background.jeashGetGraphics().clear();
		background.jeashGetGraphics().beginFill(15073349,0.60);
		background.jeashGetGraphics().drawRect(0,0,nme.Lib.nmeGetCurrent().getStage().jeashGetStageWidth(),nme.Lib.nmeGetCurrent().getStage().jeashGetStageHeight());
		this.addChild(background);
		var outerBorder = new jeash.display.Sprite();
		outerBorder.jeashGetGraphics().clear();
		outerBorder.jeashGetGraphics().lineStyle(3.0,15073349);
		outerBorder = this.makeLineRect(outerBorder,2,2,nme.Lib.nmeGetCurrent().getStage().jeashGetStageWidth() - 3,nme.Lib.nmeGetCurrent().getStage().jeashGetStageHeight() - 3);
		this.addChild(outerBorder);
		var innerBorder = new jeash.display.Sprite();
		innerBorder.jeashGetGraphics().clear();
		innerBorder.jeashGetGraphics().lineStyle(1.0,0,0.10);
		innerBorder = this.makeLineRect(innerBorder,2,2,nme.Lib.nmeGetCurrent().getStage().jeashGetStageWidth() - 3,nme.Lib.nmeGetCurrent().getStage().jeashGetStageHeight() - 3);
		this.addChild(innerBorder);
	}
	,makeLineRect: function(sprite,x,y,width,height) {
		sprite.jeashGetGraphics().moveTo(x,y);
		sprite.jeashGetGraphics().lineTo(width,y);
		sprite.jeashGetGraphics().lineTo(width,height);
		sprite.jeashGetGraphics().lineTo(x,height);
		sprite.jeashGetGraphics().lineTo(x,y);
		return sprite;
	}
	,initialize: function() {
		nme.Lib.nmeGetCurrent().getStage().align = jeash.display.StageAlign.TOP_LEFT;
		nme.Lib.nmeGetCurrent().getStage().scaleMode = jeash.display.StageScaleMode.NO_SCALE;
		this.makeBackground();
	}
	,__class__: PushPullFactory
});
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
var Xml = function() {
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
Xml.prototype = {
	getParent: function() {
		return this._parent;
	}
	,setNodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,getNodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,setNodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,getNodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,__class__: Xml
}
var haxe = {}
haxe.Resource = function() { }
$hxClasses["haxe.Resource"] = haxe.Resource;
haxe.Resource.__name__ = ["haxe","Resource"];
haxe.Resource.getString = function(name) {
	var _g = 0, _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return x.str;
			var b = haxe.Unserializer.run(x.data);
			return b.toString();
		}
	}
	return null;
}
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	unserialize: function() {
		switch(this.buf.charCodeAt(this.pos++)) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new Hash();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new IntHash();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) throw "Invalid IntHash format";
			return h;
		case 118:
			var d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i + (len - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!js.Boot.__instanceof(k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,__class__: haxe.Unserializer
}
haxe.io = {}
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.prototype = {
	toString: function() {
		return this.readString(0,this.length);
	}
	,readString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c2 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,__class__: haxe.io.Bytes
}
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
haxe.io.Input = function() { }
$hxClasses["haxe.io.Input"] = haxe.io.Input;
haxe.io.Input.__name__ = ["haxe","io","Input"];
haxe.io.Input.prototype = {
	setEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,__class__: haxe.io.Input
}
jeash.Selection = function() { }
$hxClasses["jeash.Selection"] = jeash.Selection;
jeash.Selection.__name__ = ["jeash","Selection"];
jeash.Selection.prototype = {
	__class__: jeash.Selection
}
jeash.MessagePortArray = function() { }
$hxClasses["jeash.MessagePortArray"] = jeash.MessagePortArray;
jeash.MessagePortArray.__name__ = ["jeash","MessagePortArray"];
jeash.MessagePort = function() { }
$hxClasses["jeash.MessagePort"] = jeash.MessagePort;
jeash.MessagePort.__name__ = ["jeash","MessagePort"];
jeash.MessagePort.prototype = {
	__class__: jeash.MessagePort
}
jeash._Lib = {}
jeash._Lib.CursorType = $hxClasses["jeash._Lib.CursorType"] = { __ename__ : true, __constructs__ : ["Pointer","Text","Default"] }
jeash._Lib.CursorType.Pointer = ["Pointer",0];
jeash._Lib.CursorType.Pointer.toString = $estr;
jeash._Lib.CursorType.Pointer.__enum__ = jeash._Lib.CursorType;
jeash._Lib.CursorType.Text = ["Text",1];
jeash._Lib.CursorType.Text.toString = $estr;
jeash._Lib.CursorType.Text.__enum__ = jeash._Lib.CursorType;
jeash._Lib.CursorType.Default = ["Default",2];
jeash._Lib.CursorType.Default.toString = $estr;
jeash._Lib.CursorType.Default.__enum__ = jeash._Lib.CursorType;
jeash.Lib = function(title,width,height) {
	this.mKilled = false;
	var document = js.Lib.document;
	this.__scr = document.getElementById(title);
	if(this.__scr == null) throw "Element with id '" + title + "' not found";
	this.__scr.style.setProperty("overflow","hidden","");
	this.__scr.style.setProperty("position","absolute","");
	if(this.__scr.style.getPropertyValue("width") != "100%") this.__scr.style.width = width + "px";
	if(this.__scr.style.getPropertyValue("height") != "100%") this.__scr.style.height = height + "px";
};
$hxClasses["jeash.Lib"] = jeash.Lib;
jeash.Lib.__name__ = ["jeash","Lib"];
jeash.Lib.trace = function(arg) {
	if(window.console != null) window.console.log(arg);
}
jeash.Lib.jeashGetCurrent = function() {
	if(jeash.Lib.mMainClassRoot == null) {
		jeash.Lib.mMainClassRoot = new jeash.display.MovieClip();
		jeash.Lib.mCurrent = jeash.Lib.mMainClassRoot;
		jeash.Lib.jeashGetStage().addChild(jeash.Lib.mCurrent);
	}
	return jeash.Lib.mMainClassRoot;
}
jeash.Lib.jeashGetStage = function() {
	if(jeash.Lib.mStage == null) {
		var width = jeash.Lib.jeashGetWidth();
		var height = jeash.Lib.jeashGetHeight();
		jeash.Lib.mStage = new jeash.display.Stage(width,height);
	}
	return jeash.Lib.mStage;
}
jeash.Lib.jeashAppendSurface = function(surface,before,after) {
	if(jeash.Lib.mMe.__scr != null) {
		surface.style.setProperty("position","absolute","");
		surface.style.setProperty("left","0px","");
		surface.style.setProperty("top","0px","");
		surface.style.setProperty("transform-origin","0 0","");
		surface.style.setProperty("-moz-transform-origin","0 0","");
		surface.style.setProperty("-webkit-transform-origin","0 0","");
		surface.style.setProperty("-o-transform-origin","0 0","");
		surface.style.setProperty("-ms-transform-origin","0 0","");
		try {
			if(surface.localName == "canvas") surface.onmouseover = surface.onselectstart = function() {
				return false;
			};
		} catch( e ) {
		}
		var rootNode = jeash.Lib.mMe.__scr;
		if(before != null) rootNode.insertBefore(surface,before); else if(after != null && after.nextSibling != null) rootNode.insertBefore(surface,after.nextSibling); else rootNode.appendChild(surface);
	}
}
jeash.Lib.jeashSwapSurface = function(surface1,surface2) {
	var c1 = -1;
	var c2 = -1;
	var swap;
	var _g1 = 0, _g = jeash.Lib.mMe.__scr.childNodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(jeash.Lib.mMe.__scr.childNodes[i] == surface1) c1 = i; else if(jeash.Lib.mMe.__scr.childNodes[i] == surface2) c2 = i;
	}
	if(c1 != -1 && c2 != -1) {
		swap = jeash.Lib.jeashRemoveSurface(jeash.Lib.mMe.__scr.childNodes[c1]);
		if(c2 > c1) c2--;
		if(c2 < jeash.Lib.mMe.__scr.childNodes.length - 1) jeash.Lib.mMe.__scr.insertBefore(swap,jeash.Lib.mMe.__scr.childNodes[c2++]); else jeash.Lib.mMe.__scr.appendChild(swap);
		swap = jeash.Lib.jeashRemoveSurface(jeash.Lib.mMe.__scr.childNodes[c2]);
		if(c1 > c2) c1--;
		if(c1 < jeash.Lib.mMe.__scr.childNodes.length - 1) jeash.Lib.mMe.__scr.insertBefore(swap,jeash.Lib.mMe.__scr.childNodes[c1++]); else jeash.Lib.mMe.__scr.appendChild(swap);
	}
}
jeash.Lib.jeashSetSurfaceZIndexAfter = function(surface1,surface2) {
	var c1 = -1;
	var c2 = -1;
	var swap;
	var _g1 = 0, _g = jeash.Lib.mMe.__scr.childNodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(jeash.Lib.mMe.__scr.childNodes[i] == surface1) c1 = i; else if(jeash.Lib.mMe.__scr.childNodes[i] == surface2) c2 = i;
	}
	if(c1 != -1 && c2 != -1) {
		swap = jeash.Lib.jeashRemoveSurface(jeash.Lib.mMe.__scr.childNodes[c1]);
		if(c2 < jeash.Lib.mMe.__scr.childNodes.length - 1) jeash.Lib.mMe.__scr.insertBefore(swap,jeash.Lib.mMe.__scr.childNodes[c2++]); else jeash.Lib.mMe.__scr.appendChild(swap);
	}
}
jeash.Lib.jeashIsOnStage = function(surface) {
	var success = false;
	var nodes = jeash.Lib.mMe.__scr.childNodes;
	var _g1 = 0, _g = nodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(nodes[i] == surface) {
			success = true;
			break;
		}
	}
	return success;
}
jeash.Lib.jeashRemoveSurface = function(surface) {
	if(jeash.Lib.mMe.__scr != null) {
		var anim = surface.getAttribute("data-jeash-anim");
		if(anim != null) {
			var style = js.Lib.document.getElementById(anim);
			if(style != null) jeash.Lib.mMe.__scr.removeChild(style);
		}
		jeash.Lib.mMe.__scr.removeChild(surface);
	}
	return surface;
}
jeash.Lib.jeashSetSurfaceTransform = function(surface,matrix) {
	if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1 && surface.getAttribute("data-jeash-anim") == null) {
		surface.style.left = matrix.tx + "px";
		surface.style.top = matrix.ty + "px";
	} else {
		surface.style.left = "0px";
		surface.style.top = "0px";
		surface.style.setProperty("transform",matrix.toString(),"");
		surface.style.setProperty("-moz-transform",matrix.toMozString(),"");
		surface.style.setProperty("-webkit-transform",matrix.to3DString(),"");
		surface.style.setProperty("-o-transform",matrix.toString(),"");
		surface.style.setProperty("-ms-transform",matrix.toString(),"");
	}
}
jeash.Lib.jeashSetSurfaceOpacity = function(surface,alpha) {
	surface.style.setProperty("opacity",Std.string(alpha),"");
}
jeash.Lib.jeashCopyStyle = function(src,tgt) {
	tgt.id = src.id;
	var _g = 0, _g1 = ["left","top","transform","transform-origin","-moz-transform","-moz-transform-origin","-webkit-transform","-webkit-transform-origin","-o-transform","-o-transform-origin","opacity","display"];
	while(_g < _g1.length) {
		var prop = _g1[_g];
		++_g;
		tgt.style.setProperty(prop,src.style.getPropertyValue(prop),"");
	}
}
jeash.Lib.jeashDrawToSurface = function(surface,tgt,matrix,alpha,clipRect) {
	if(alpha == null) alpha = 1.0;
	var srcCtx = surface.getContext("2d");
	var tgtCtx = tgt.getContext("2d");
	if(alpha != 1.0) tgtCtx.globalAlpha = alpha;
	if(surface.width > 0 && surface.height > 0) {
		if(matrix != null) {
			tgtCtx.save();
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) tgtCtx.translate(matrix.tx,matrix.ty); else tgtCtx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			jeash.Lib.jeashDrawClippedImage(surface,tgtCtx,clipRect);
			tgtCtx.restore();
		} else jeash.Lib.jeashDrawClippedImage(surface,tgtCtx,clipRect);
	}
}
jeash.Lib.jeashDrawClippedImage = function(surface,tgtCtx,clipRect) {
	if(clipRect != null) {
		if(clipRect.x < 0) {
			clipRect.width += clipRect.x;
			clipRect.x = 0;
		}
		if(clipRect.y < 0) {
			clipRect.height += clipRect.y;
			clipRect.y = 0;
		}
		if(clipRect.width > surface.width - clipRect.x) clipRect.width = surface.width - clipRect.x;
		if(clipRect.height > surface.height - clipRect.y) clipRect.height = surface.height - clipRect.y;
		tgtCtx.drawImage(surface,clipRect.x,clipRect.y,clipRect.width,clipRect.height,clipRect.x,clipRect.y,clipRect.width,clipRect.height);
	} else tgtCtx.drawImage(surface,0,0);
}
jeash.Lib.jeashDisableRightClick = function() {
	if(jeash.Lib.mMe != null) try {
		jeash.Lib.mMe.__scr.oncontextmenu = function() {
			return false;
		};
	} catch( e ) {
		jeash.Lib.trace("Disable right click not supported in this browser.");
	}
}
jeash.Lib.jeashEnableRightClick = function() {
	if(jeash.Lib.mMe != null) try {
		jeash.Lib.mMe.__scr.oncontextmenu = null;
	} catch( e ) {
		jeash.Lib.trace("Enable right click not supported in this browser.");
	}
}
jeash.Lib.jeashEnableFullScreen = function() {
	if(jeash.Lib.mMe != null) {
		var origWidth = jeash.Lib.mMe.__scr.style.getPropertyValue("width");
		var origHeight = jeash.Lib.mMe.__scr.style.getPropertyValue("height");
		jeash.Lib.mMe.__scr.style.setProperty("width","100%","");
		jeash.Lib.mMe.__scr.style.setProperty("height","100%","");
		jeash.Lib.jeashDisableFullScreen = function() {
			jeash.Lib.mMe.__scr.style.setProperty("width",origWidth,"");
			jeash.Lib.mMe.__scr.style.setProperty("height",origHeight,"");
		};
	}
}
jeash.Lib.jeashDisableFullScreen = function() {
}
jeash.Lib.jeashFullScreenWidth = function() {
	var window = js.Lib.window;
	return window.innerWidth;
}
jeash.Lib.jeashFullScreenHeight = function() {
	var window = js.Lib.window;
	return window.innerHeight;
}
jeash.Lib.jeashSetCursor = function(type) {
	if(jeash.Lib.mMe != null) jeash.Lib.mMe.__scr.style.cursor = (function($this) {
		var $r;
		switch( (type)[1] ) {
		case 0:
			$r = "pointer";
			break;
		case 1:
			$r = "text";
			break;
		default:
			$r = "default";
		}
		return $r;
	}(this));
}
jeash.Lib.jeashSetSurfaceVisible = function(surface,visible) {
	if(visible) surface.style.setProperty("display","block",""); else surface.style.setProperty("display","none","");
}
jeash.Lib.jeashSetSurfaceId = function(surface,name) {
	var regex = new EReg("[^a-zA-Z0-9\\-]","g");
	surface.id = regex.replace(name,"_");
}
jeash.Lib.Run = function(tgt,width,height) {
	jeash.Lib.mMe = new jeash.Lib(tgt.id,width,height);
	var _g1 = 0, _g = tgt.attributes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var attr = tgt.attributes.item(i);
		if(StringTools.startsWith(attr.name,"data-")) switch(attr.name) {
		case "data-" + "framerate":
			jeash.Lib.jeashGetStage().jeashSetFrameRate(Std.parseFloat(attr.value));
			break;
		default:
		}
	}
	if(Reflect.hasField(tgt,"on" + jeash.Lib.HTML_TOUCH_EVENT_TYPES[0])) {
		var _g = 0, _g1 = jeash.Lib.HTML_TOUCH_EVENT_TYPES;
		while(_g < _g1.length) {
			var type = _g1[_g];
			++_g;
			tgt.addEventListener(type,($_=jeash.Lib.jeashGetStage(),$bind($_,$_.jeashQueueStageEvent)),true);
		}
	}
	var _g = 0, _g1 = jeash.Lib.HTML_DIV_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=jeash.Lib.jeashGetStage(),$bind($_,$_.jeashQueueStageEvent)),true);
	}
	var window = js.Lib.window;
	if(Reflect.hasField(window,"on" + "devicemotion")) window.addEventListener("devicemotion",($_=jeash.Lib.jeashGetStage(),$bind($_,$_.jeashQueueStageEvent)),true);
	if(Reflect.hasField(window,"on" + "orientationchange")) window.addEventListener("orientationchange",($_=jeash.Lib.jeashGetStage(),$bind($_,$_.jeashQueueStageEvent)),true);
	var _g = 0, _g1 = jeash.Lib.HTML_WINDOW_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		window.addEventListener(type,($_=jeash.Lib.jeashGetStage(),$bind($_,$_.jeashQueueStageEvent)),false);
	}
	jeash.Lib.jeashGetStage().jeashSetBackgroundColour(tgt.style.backgroundColor != null && tgt.style.backgroundColor != ""?jeash.Lib.jeashParseColor(tgt.style.backgroundColor,function(res,pos,cur) {
		return (function($this) {
			var $r;
			switch(pos) {
			case 0:
				$r = res | cur << 16;
				break;
			case 1:
				$r = res | cur << 8;
				break;
			case 2:
				$r = res | cur;
				break;
			}
			return $r;
		}(this));
	}):16777215);
	jeash.Lib.jeashGetCurrent().jeashGetGraphics().beginFill(jeash.Lib.jeashGetStage().jeashGetBackgroundColour());
	jeash.Lib.jeashGetCurrent().jeashGetGraphics().drawRect(0,0,width,height);
	jeash.Lib.jeashSetSurfaceId(jeash.Lib.jeashGetCurrent().jeashGetGraphics().jeashSurface,"Root MovieClip");
	jeash.Lib.jeashGetStage().jeashUpdateNextWake();
	try {
		var winParameters = window.winParameters();
		var _g = 0, _g1 = Reflect.fields(winParameters);
		while(_g < _g1.length) {
			var prop = _g1[_g];
			++_g;
			jeash.Lib.jeashGetCurrent().loaderInfo.parameters[prop] = Reflect.field(winParameters,prop);
		}
	} catch( e ) {
	}
	return jeash.Lib.mMe;
}
jeash.Lib.jeashParseColor = function(str,cb) {
	var re = new EReg("rgb\\(([0-9]*), ?([0-9]*), ?([0-9]*)\\)","");
	var hex = new EReg("#([0-9a-zA-Z][0-9a-zA-Z])([0-9a-zA-Z][0-9a-zA-Z])([0-9a-zA-Z][0-9a-zA-Z])","");
	if(re.match(str)) {
		var col = 0;
		var _g = 1;
		while(_g < 4) {
			var pos = _g++;
			var v = Std.parseInt(re.matched(pos));
			col = cb(col,pos - 1,v);
		}
		return col;
	} else if(hex.match(str)) {
		var col = 0;
		var _g = 1;
		while(_g < 4) {
			var pos = _g++;
			var v = "0x" + hex.matched(pos) & 255;
			v = cb(col,pos - 1,v);
		}
		return col;
	} else throw "Cannot parse color '" + str + "'.";
}
jeash.Lib.jeashGetWidth = function() {
	var tgt = jeash.Lib.mMe != null?jeash.Lib.mMe.__scr:js.Lib.document.getElementById("haxe:jeash");
	return tgt.clientWidth > 0?tgt.clientWidth:500;
}
jeash.Lib.jeashGetHeight = function() {
	var tgt = jeash.Lib.mMe != null?jeash.Lib.mMe.__scr:js.Lib.document.getElementById("haxe:jeash");
	return tgt.clientHeight > 0?tgt.clientHeight:500;
}
jeash.Lib.jeashBootstrap = function() {
	if(jeash.Lib.mMe == null) {
		var tgt = js.Lib.document.getElementById("haxe:jeash");
		if(navigator.userAgent.indexOf("BlackBerry") > -1 && tgt.style.height == "100%") tgt.style.height = screen.height + "px";
		jeash.Lib.Run(tgt,jeash.Lib.jeashGetWidth(),jeash.Lib.jeashGetHeight());
	}
}
jeash.Lib.prototype = {
	__class__: jeash.Lib
}
jeash.display.Bitmap = function(inBitmapData,inPixelSnapping,inSmoothing) {
	jeash.display.DisplayObject.call(this);
	this.pixelSnapping = inPixelSnapping;
	this.smoothing = inSmoothing;
	this.jeashGraphics = new jeash.display.Graphics();
	if(inBitmapData != null) {
		this.jeashSetBitmapData(inBitmapData);
		this.jeashRender();
	}
};
$hxClasses["jeash.display.Bitmap"] = jeash.display.Bitmap;
jeash.display.Bitmap.__name__ = ["jeash","display","Bitmap"];
jeash.display.Bitmap.__super__ = jeash.display.DisplayObject;
jeash.display.Bitmap.prototype = $extend(jeash.display.DisplayObject.prototype,{
	jeashGetObjectUnderPoint: function(point) {
		if(!this.jeashGetVisible()) return null; else if(this.bitmapData != null) {
			var local = this.globalToLocal(point);
			if(local.x < 0 || local.y < 0 || local.x > this.jeashGetWidth() || local.y > this.jeashGetHeight()) return null; else return this;
		} else return jeash.display.DisplayObject.prototype.jeashGetObjectUnderPoint.call(this,point);
	}
	,getBitmapSurfaceTransform: function(gfx) {
		var extent = gfx.jeashExtentWithFilters;
		var fm = this.transform.jeashGetFullMatrix(null);
		fm.jeashTranslateTransformed(extent.get_topLeft());
		return fm;
	}
	,jeashRender: function(inMask,clipRect) {
		if(!this.jeashVisible) return;
		if(this.bitmapData == null) return;
		if((this._jeashRenderFlags & 4) != 0 || (this._jeashRenderFlags & 8) != 0) this.jeashValidateMatrix();
		var imageDataLease = this.bitmapData.jeashLease;
		if(imageDataLease != null && (this.jeashCurrentLease == null || imageDataLease.seed != this.jeashCurrentLease.seed || imageDataLease.time != this.jeashCurrentLease.time)) {
			var srcCanvas = this.bitmapData._jeashTextureBuffer;
			this.jeashGraphics.jeashSurface.width = srcCanvas.width;
			this.jeashGraphics.jeashSurface.height = srcCanvas.height;
			this.jeashGraphics.clear();
			jeash.Lib.jeashDrawToSurface(srcCanvas,this.jeashGraphics.jeashSurface);
			this.jeashCurrentLease = imageDataLease.clone();
			this._jeashRenderFlags |= 64;
			if(this.parent != null) this.parent._jeashRenderFlags |= 64;
			this.jeashApplyFilters(this.jeashGraphics.jeashSurface);
			this._jeashRenderFlags |= 32;
		}
		var fullAlpha = (this.parent != null?this.parent.alpha:1) * this.alpha;
		if(inMask != null) {
			this.jeashApplyFilters(this.jeashGraphics.jeashSurface);
			var m = this.getBitmapSurfaceTransform(this.jeashGraphics);
			jeash.Lib.jeashDrawToSurface(this.jeashGraphics.jeashSurface,inMask,m,fullAlpha,clipRect);
		} else {
			if((this._jeashRenderFlags & 32) != 0) {
				var m = this.getBitmapSurfaceTransform(this.jeashGraphics);
				jeash.Lib.jeashSetSurfaceTransform(this.jeashGraphics.jeashSurface,m);
				this._jeashRenderFlags &= -33;
			}
			if(fullAlpha != this._lastFullAlpha) {
				jeash.Lib.jeashSetSurfaceOpacity(this.jeashGraphics.jeashSurface,fullAlpha);
				this._lastFullAlpha = fullAlpha;
			}
		}
	}
	,validateBounds: function() {
		if(this.getBoundsInvalid()) {
			jeash.display.DisplayObject.prototype.validateBounds.call(this);
			if(this.bitmapData != null) {
				var r = new jeash.geom.Rectangle(0,0,this.bitmapData.getWidth(),this.bitmapData.getHeight());
				if(r.width != 0 || r.height != 0) {
					if(this.jeashBoundsRect.width == 0 && this.jeashBoundsRect.height == 0) this.jeashBoundsRect = r.clone(); else this.jeashBoundsRect.extendBounds(r);
				}
			}
			if(this.scale9Grid != null) {
				this.jeashBoundsRect.width *= this.jeashScaleX;
				this.jeashBoundsRect.height *= this.jeashScaleY;
				this.jeashWidth = this.jeashBoundsRect.width;
				this.jeashHeight = this.jeashBoundsRect.height;
			} else {
				this.jeashWidth = this.jeashBoundsRect.width * this.jeashScaleX;
				this.jeashHeight = this.jeashBoundsRect.height * this.jeashScaleY;
			}
		}
	}
	,jeashGetGraphics: function() {
		return this.jeashGraphics;
	}
	,jeashSetBitmapData: function(inBitmapData) {
		this._jeashRenderFlags |= 64;
		if(this.parent != null) this.parent._jeashRenderFlags |= 64;
		this.bitmapData = inBitmapData;
		return inBitmapData;
	}
	,toString: function() {
		return "[Bitmap name=" + this.name + " id=" + this._jeashId + "]";
	}
	,__class__: jeash.display.Bitmap
});
jeash.display.ImageDataLease = function() {
};
$hxClasses["jeash.display.ImageDataLease"] = jeash.display.ImageDataLease;
jeash.display.ImageDataLease.__name__ = ["jeash","display","ImageDataLease"];
jeash.display.ImageDataLease.prototype = {
	clone: function() {
		var leaseClone = new jeash.display.ImageDataLease();
		leaseClone.seed = this.seed;
		leaseClone.time = this.time;
		return leaseClone;
	}
	,set: function(s,t) {
		this.seed = s;
		this.time = t;
	}
	,__class__: jeash.display.ImageDataLease
}
jeash.display.BitmapData = function(width,height,transparent,inFillColor) {
	if(inFillColor == null) inFillColor = -1;
	if(transparent == null) transparent = true;
	this.jeashLocked = false;
	this.jeashLeaseNum = 0;
	this.jeashLease = new jeash.display.ImageDataLease();
	this.jeashLease.set(this.jeashLeaseNum++,new Date().getTime());
	this._jeashTextureBuffer = js.Lib.document.createElement("canvas");
	this._jeashTextureBuffer.width = width;
	this._jeashTextureBuffer.height = height;
	this._jeashId = jeash.utils.Uuid.uuid();
	jeash.Lib.jeashSetSurfaceId(this._jeashTextureBuffer,this._jeashId);
	this.jeashTransparent = transparent;
	this.rect = new jeash.geom.Rectangle(0,0,width,height);
	if(this.jeashTransparent) {
		this.jeashTransparentFiller = js.Lib.document.createElement("canvas");
		this.jeashTransparentFiller.width = width;
		this.jeashTransparentFiller.height = height;
		var ctx = this.jeashTransparentFiller.getContext("2d");
		ctx.fillStyle = "rgba(0,0,0,0);";
		ctx.fill();
	}
	if(inFillColor != null && width > 0 && height > 0) {
		if(!this.jeashTransparent) inFillColor |= -16777216;
		this.jeashInitColor = inFillColor;
		this.jeashFillRect(this.rect,inFillColor);
	}
};
$hxClasses["jeash.display.BitmapData"] = jeash.display.BitmapData;
jeash.display.BitmapData.__name__ = ["jeash","display","BitmapData"];
jeash.display.BitmapData.__interfaces__ = [jeash.display.IBitmapDrawable];
jeash.display.BitmapData.jeashCopySurface = function(originalSurface) {
	var newSurface = js.Lib.document.createElement("canvas");
	newSurface.width = originalSurface.width;
	newSurface.height = originalSurface.height;
	jeash.Lib.jeashDrawToSurface(originalSurface,newSurface);
	jeash.Lib.jeashCopyStyle(originalSurface,newSurface);
	return newSurface;
}
jeash.display.BitmapData.jeashColorTransformSurface = function(surface,inColorTransform) {
	if(inColorTransform != null) {
		var rect = new jeash.geom.Rectangle(0,0,surface.width,surface.height);
		jeash.display.BitmapData.jeashColorTransform(rect,inColorTransform,surface,null);
	}
}
jeash.display.BitmapData.jeashColorTransform = function(rect,colorTransform,surface,imagedata) {
	if(rect != null && rect.width > 0 && rect.height > 0) {
		var ctx = null;
		if(imagedata == null) {
			ctx = surface.getContext("2d");
			imagedata = ctx.getImageData(rect.x,rect.y,rect.width,rect.height);
		}
		var offsetX;
		var _g1 = 0, _g = imagedata.data.length >> 2;
		while(_g1 < _g) {
			var i = _g1++;
			offsetX = i * 4;
			imagedata.data[offsetX] = imagedata.data[offsetX] * colorTransform.redMultiplier + colorTransform.redOffset | 0;
			imagedata.data[offsetX + 1] = imagedata.data[offsetX + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset | 0;
			imagedata.data[offsetX + 2] = imagedata.data[offsetX + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset | 0;
			imagedata.data[offsetX + 3] = imagedata.data[offsetX + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset | 0;
		}
		if(ctx != null) ctx.putImageData(imagedata,rect.x,rect.y);
	}
}
jeash.display.BitmapData.prototype = {
	jeashBuildLease: function() {
		this.jeashLease.set(this.jeashLeaseNum++,new Date().getTime());
	}
	,jeashGetSurface: function() {
		var surface = null;
		if(!this.jeashLocked) surface = this._jeashTextureBuffer;
		return surface;
	}
	,drawToSurface: function(inSurface,matrix,inColorTransform,blendMode,clipRect,smothing) {
		var surfaceCopy = jeash.display.BitmapData.jeashCopySurface(this.jeashGetSurface());
		jeash.display.BitmapData.jeashColorTransformSurface(surfaceCopy,inColorTransform);
		var ctx = inSurface.getContext("2d");
		if(matrix != null) {
			ctx.save();
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) ctx.translate(matrix.tx,matrix.ty); else ctx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			ctx.drawImage(surfaceCopy,0,0);
			ctx.restore();
		} else ctx.drawImage(surfaceCopy,0,0);
	}
	,jeashLoadFromFile: function(inFilename,inLoader) {
		var _g = this;
		var image = js.Lib.document.createElement("img");
		if(inLoader != null) {
			var data = { image : image, texture : this._jeashTextureBuffer, inLoader : inLoader, bitmapData : this};
			image.addEventListener("load",(function(f,a1) {
				return function(e) {
					return f(a1,e);
				};
			})($bind(this,this.jeashOnLoad),data),false);
			image.addEventListener("error",function(e) {
				if(!image.complete) _g.jeashOnLoad(data,e);
			},false);
		}
		image.src = inFilename;
		if(image.complete) {
		}
	}
	,jeashOnLoad: function(data,e) {
		var canvas = data.texture;
		var width = data.image.width;
		var height = data.image.height;
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(data.image,0,0,width,height);
		data.bitmapData.width = width;
		data.bitmapData.height = height;
		data.bitmapData.rect = new jeash.geom.Rectangle(0,0,width,height);
		data.bitmapData.jeashBuildLease();
		if(data.inLoader != null) {
			var e1 = new jeash.events.Event(jeash.events.Event.COMPLETE);
			e1.target = data.inLoader;
			data.inLoader.dispatchEvent(e1);
		}
	}
	,getHeight: function() {
		if(this._jeashTextureBuffer != null) return this._jeashTextureBuffer.height; else return 0;
	}
	,getWidth: function() {
		if(this._jeashTextureBuffer != null) return this._jeashTextureBuffer.width; else return 0;
	}
	,jeashFillRect: function(rect,color) {
		this.jeashLease.set(this.jeashLeaseNum++,new Date().getTime());
		var ctx = this._jeashTextureBuffer.getContext("2d");
		var r = (color & 16711680) >>> 16;
		var g = (color & 65280) >>> 8;
		var b = color & 255;
		var a = this.jeashTransparent?color >>> 24:255;
		if(!this.jeashLocked) {
			if(this.jeashTransparent) {
				var trpCtx = this.jeashTransparentFiller.getContext("2d");
				var trpData = trpCtx.getImageData(rect.x,rect.y,rect.width,rect.height);
				ctx.putImageData(trpData,rect.x,rect.y);
			}
			var style = "rgba(";
			style += r;
			style += ", ";
			style += g;
			style += ", ";
			style += b;
			style += ", ";
			style += a / 255;
			style += ")";
			ctx.fillStyle = style;
			ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
		} else {
			var s = 4 * (Math.round(rect.x) + Math.round(rect.y) * this.jeashImageData.width);
			var offsetY;
			var offsetX;
			var _g1 = 0, _g = Math.round(rect.height);
			while(_g1 < _g) {
				var i = _g1++;
				offsetY = i * this.jeashImageData.width;
				var _g3 = 0, _g2 = Math.round(rect.width);
				while(_g3 < _g2) {
					var j = _g3++;
					offsetX = 4 * (j + offsetY);
					this.jeashImageData.data[s + offsetX] = r;
					this.jeashImageData.data[s + offsetX + 1] = g;
					this.jeashImageData.data[s + offsetX + 2] = b;
					this.jeashImageData.data[s + offsetX + 3] = a;
				}
			}
			this.jeashImageDataChanged = true;
			ctx.putImageData(this.jeashImageData,0,0,rect.x,rect.y,rect.width,rect.height);
		}
	}
	,__class__: jeash.display.BitmapData
}
jeash.display.CapsStyle = $hxClasses["jeash.display.CapsStyle"] = { __ename__ : true, __constructs__ : ["NONE","ROUND","SQUARE"] }
jeash.display.CapsStyle.NONE = ["NONE",0];
jeash.display.CapsStyle.NONE.toString = $estr;
jeash.display.CapsStyle.NONE.__enum__ = jeash.display.CapsStyle;
jeash.display.CapsStyle.ROUND = ["ROUND",1];
jeash.display.CapsStyle.ROUND.toString = $estr;
jeash.display.CapsStyle.ROUND.__enum__ = jeash.display.CapsStyle;
jeash.display.CapsStyle.SQUARE = ["SQUARE",2];
jeash.display.CapsStyle.SQUARE.toString = $estr;
jeash.display.CapsStyle.SQUARE.__enum__ = jeash.display.CapsStyle;
jeash.display.GfxPoint = function(inX,inY,inCX,inCY,inType) {
	this.x = inX;
	this.y = inY;
	this.cx = inCX;
	this.cy = inCY;
	this.type = inType;
};
$hxClasses["jeash.display.GfxPoint"] = jeash.display.GfxPoint;
jeash.display.GfxPoint.__name__ = ["jeash","display","GfxPoint"];
jeash.display.GfxPoint.prototype = {
	__class__: jeash.display.GfxPoint
}
jeash.display.LineJob = function(inGrad,inPoint_idx0,inPoint_idx1,inThickness,inAlpha,inColour,inPixel_hinting,inJoints,inCaps,inScale_mode,inMiter_limit) {
	this.grad = inGrad;
	this.point_idx0 = inPoint_idx0;
	this.point_idx1 = inPoint_idx1;
	this.thickness = inThickness;
	this.alpha = inAlpha;
	this.colour = inColour;
	this.pixel_hinting = inPixel_hinting;
	this.joints = inJoints;
	this.caps = inCaps;
	this.scale_mode = inScale_mode;
	this.miter_limit = inMiter_limit;
};
$hxClasses["jeash.display.LineJob"] = jeash.display.LineJob;
jeash.display.LineJob.__name__ = ["jeash","display","LineJob"];
jeash.display.LineJob.prototype = {
	__class__: jeash.display.LineJob
}
jeash.display.PointInPathMode = $hxClasses["jeash.display.PointInPathMode"] = { __ename__ : true, __constructs__ : ["USER_SPACE","DEVICE_SPACE"] }
jeash.display.PointInPathMode.USER_SPACE = ["USER_SPACE",0];
jeash.display.PointInPathMode.USER_SPACE.toString = $estr;
jeash.display.PointInPathMode.USER_SPACE.__enum__ = jeash.display.PointInPathMode;
jeash.display.PointInPathMode.DEVICE_SPACE = ["DEVICE_SPACE",1];
jeash.display.PointInPathMode.DEVICE_SPACE.toString = $estr;
jeash.display.PointInPathMode.DEVICE_SPACE.__enum__ = jeash.display.PointInPathMode;
jeash.display.Graphics = function(inSurface) {
	jeash.Lib.jeashBootstrap();
	if(inSurface == null) {
		this.jeashSurface = js.Lib.document.createElement("canvas");
		this.jeashSurface.width = 0;
		this.jeashSurface.height = 0;
	} else this.jeashSurface = inSurface;
	this.mLastMoveID = 0;
	this.mPenX = 0.0;
	this.mPenY = 0.0;
	this.mDrawList = new Array();
	this.mPoints = [];
	this.mSolidGradient = null;
	this.mBitmap = null;
	this.mFilling = false;
	this.mFillColour = 0;
	this.mFillAlpha = 0.0;
	this.mLastMoveID = 0;
	this.boundsDirty = true;
	this.jeashClearLine();
	this.mLineJobs = [];
	this.jeashChanged = true;
	this.nextDrawIndex = 0;
	this.jeashExtent = new jeash.geom.Rectangle();
	this.jeashExtentWithFilters = new jeash.geom.Rectangle();
	this._padding = 0.0;
	this.jeashClearNextCycle = true;
};
$hxClasses["jeash.display.Graphics"] = jeash.display.Graphics;
jeash.display.Graphics.__name__ = ["jeash","display","Graphics"];
jeash.display.Graphics.jeashDetectIsPointInPathMode = function() {
	var canvas = js.Lib.document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	if(ctx.isPointInPath == null) return jeash.display.PointInPathMode.USER_SPACE;
	ctx.save();
	ctx.translate(1,0);
	ctx.beginPath();
	ctx.rect(0,0,1,1);
	var rv = ctx.isPointInPath(0.3,0.3)?jeash.display.PointInPathMode.USER_SPACE:jeash.display.PointInPathMode.DEVICE_SPACE;
	ctx.restore();
	return rv;
}
jeash.display.Graphics.prototype = {
	jeashAdjustSurface: function(sx,sy) {
		if(sy == null) sy = 1.0;
		if(sx == null) sx = 1.0;
		if(Reflect.field(this.jeashSurface,"getContext") != null) {
			var width = Math.ceil((this.jeashExtentWithFilters.width - this.jeashExtentWithFilters.x) * sx);
			var height = Math.ceil((this.jeashExtentWithFilters.height - this.jeashExtentWithFilters.y) * sy);
			if(width <= 5000 && height <= 5000) {
				var dstCanvas = js.Lib.document.createElement("canvas");
				dstCanvas.width = width;
				dstCanvas.height = height;
				jeash.Lib.jeashDrawToSurface(this.jeashSurface,dstCanvas);
				if(jeash.Lib.jeashIsOnStage(this.jeashSurface)) {
					jeash.Lib.jeashAppendSurface(dstCanvas);
					jeash.Lib.jeashCopyStyle(this.jeashSurface,dstCanvas);
					jeash.Lib.jeashSwapSurface(this.jeashSurface,dstCanvas);
					jeash.Lib.jeashRemoveSurface(this.jeashSurface);
					if(this.jeashSurface.id != null) jeash.Lib.jeashSetSurfaceId(dstCanvas,this.jeashSurface.id);
				}
				this.jeashSurface = dstCanvas;
			}
		}
	}
	,closePolygon: function(inCancelFill) {
		var l = this.mPoints.length;
		if(l > 0) {
			if(l > 1) {
				if(this.mFilling && l > 2) {
					if(this.mPoints[this.mLastMoveID].x != this.mPoints[l - 1].x || this.mPoints[this.mLastMoveID].y != this.mPoints[l - 1].y) this.lineTo(this.mPoints[this.mLastMoveID].x,this.mPoints[this.mLastMoveID].y);
				}
				this.addLineSegment();
				var drawable = { points : this.mPoints, fillColour : this.mFillColour, fillAlpha : this.mFillAlpha, solidGradient : this.mSolidGradient, bitmap : this.mBitmap, lineJobs : this.mLineJobs};
				this.addDrawable(drawable);
			}
			this.mLineJobs = [];
			this.mPoints = [];
		}
		if(inCancelFill) {
			this.mFillAlpha = 0;
			this.mSolidGradient = null;
			this.mBitmap = null;
			this.mFilling = false;
		}
		this.jeashChanged = true;
	}
	,addLineSegment: function() {
		if(this.mCurrentLine.point_idx1 > 0) this.mLineJobs.push(new jeash.display.LineJob(this.mCurrentLine.grad,this.mCurrentLine.point_idx0,this.mCurrentLine.point_idx1,this.mCurrentLine.thickness,this.mCurrentLine.alpha,this.mCurrentLine.colour,this.mCurrentLine.pixel_hinting,this.mCurrentLine.joints,this.mCurrentLine.caps,this.mCurrentLine.scale_mode,this.mCurrentLine.miter_limit));
		this.mCurrentLine.point_idx0 = this.mCurrentLine.point_idx1 = -1;
	}
	,addDrawable: function(inDrawable) {
		if(inDrawable == null) return;
		this.mDrawList.unshift(inDrawable);
	}
	,curveTo: function(inCX,inCY,inX,inY) {
		var pid = this.mPoints.length;
		if(pid == 0) {
			this.mPoints.push(new jeash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
			pid++;
		}
		this.mPenX = inX;
		this.mPenY = inY;
		this.jeashExpandStandardExtent(inX,inY,this.mCurrentLine.thickness);
		this.mPoints.push(new jeash.display.GfxPoint(inX,inY,inCX,inCY,2));
		if(this.mCurrentLine.grad != null || this.mCurrentLine.alpha > 0) {
			if(this.mCurrentLine.point_idx0 < 0) this.mCurrentLine.point_idx0 = pid - 1;
			this.mCurrentLine.point_idx1 = pid;
		}
	}
	,lineTo: function(inX,inY) {
		var pid = this.mPoints.length;
		if(pid == 0) {
			this.mPoints.push(new jeash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
			pid++;
		}
		this.mPenX = inX;
		this.mPenY = inY;
		this.jeashExpandStandardExtent(inX,inY,this.mCurrentLine.thickness);
		this.mPoints.push(new jeash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,1));
		if(this.mCurrentLine.grad != null || this.mCurrentLine.alpha > 0) {
			if(this.mCurrentLine.point_idx0 < 0) this.mCurrentLine.point_idx0 = pid - 1;
			this.mCurrentLine.point_idx1 = pid;
		}
		if(!this.mFilling) this.closePolygon(false);
	}
	,moveTo: function(inX,inY) {
		this.mPenX = inX;
		this.mPenY = inY;
		this.jeashExpandStandardExtent(inX,inY);
		if(!this.mFilling) this.closePolygon(false); else {
			this.addLineSegment();
			this.mLastMoveID = this.mPoints.length;
			this.mPoints.push(new jeash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
		}
	}
	,jeashExpandFilteredExtent: function(x,y) {
		var maxX, minX, maxY, minY;
		minX = this.jeashExtent.x;
		minY = this.jeashExtent.y;
		maxX = this.jeashExtent.width + minX;
		maxY = this.jeashExtent.height + minY;
		maxX = x > maxX?x:maxX;
		minX = x < minX?x:minX;
		maxY = y > maxY?y:maxY;
		minY = y < minY?y:minY;
		this.jeashExtentWithFilters.x = minX;
		this.jeashExtentWithFilters.y = minY;
		this.jeashExtentWithFilters.width = maxX - minX;
		this.jeashExtentWithFilters.height = maxY - minY;
	}
	,jeashExpandStandardExtent: function(x,y,thickness) {
		if(this._padding > 0) {
			this.jeashExtent.width -= this._padding;
			this.jeashExtent.height -= this._padding;
		}
		if(thickness != null && thickness > this._padding) this._padding = thickness;
		var maxX, minX, maxY, minY;
		minX = this.jeashExtent.x;
		minY = this.jeashExtent.y;
		maxX = this.jeashExtent.width + minX;
		maxY = this.jeashExtent.height + minY;
		maxX = x > maxX?x:maxX;
		minX = x < minX?x:minX;
		maxY = y > maxY?y:maxY;
		minY = y < minY?y:minY;
		this.jeashExtent.x = minX;
		this.jeashExtent.y = minY;
		this.jeashExtent.width = maxX - minX + this._padding;
		this.jeashExtent.height = maxY - minY + this._padding;
		this.boundsDirty = true;
	}
	,clear: function() {
		this.jeashClearLine();
		this.mPenX = 0.0;
		this.mPenY = 0.0;
		this.mDrawList = new Array();
		this.nextDrawIndex = 0;
		this.mPoints = [];
		this.mSolidGradient = null;
		this.mFilling = false;
		this.mFillColour = 0;
		this.mFillAlpha = 0.0;
		this.mLastMoveID = 0;
		this.jeashClearNextCycle = true;
		this.boundsDirty = true;
		this.jeashExtent.x = 0.0;
		this.jeashExtent.y = 0.0;
		this.jeashExtent.width = 0.0;
		this.jeashExtent.height = 0.0;
		this._padding = 0.0;
		this.mLineJobs = [];
	}
	,jeashClearCanvas: function() {
		if(this.jeashSurface != null) {
			var w = this.jeashSurface.width;
			this.jeashSurface.width = w;
		}
	}
	,jeashClearLine: function() {
		this.mCurrentLine = new jeash.display.LineJob(null,-1,-1,0.0,0.0,0,1,0,256,3,3.0);
	}
	,drawRoundRect: function(x,y,width,height,rx,ry) {
		rx *= 0.5;
		ry *= 0.5;
		var w = width * 0.5;
		x += w;
		if(rx > w) rx = w;
		var lw = w - rx;
		var w_ = lw + rx * Math.sin(Math.PI / 4);
		var cw_ = lw + rx * Math.tan(Math.PI / 8);
		var h = height * 0.5;
		y += h;
		if(ry > h) ry = h;
		var lh = h - ry;
		var h_ = lh + ry * Math.sin(Math.PI / 4);
		var ch_ = lh + ry * Math.tan(Math.PI / 8);
		this.closePolygon(false);
		this.moveTo(x + w,y + lh);
		this.curveTo(x + w,y + ch_,x + w_,y + h_);
		this.curveTo(x + cw_,y + h,x + lw,y + h);
		this.lineTo(x - lw,y + h);
		this.curveTo(x - cw_,y + h,x - w_,y + h_);
		this.curveTo(x - w,y + ch_,x - w,y + lh);
		this.lineTo(x - w,y - lh);
		this.curveTo(x - w,y - ch_,x - w_,y - h_);
		this.curveTo(x - cw_,y - h,x - lw,y - h);
		this.lineTo(x + lw,y - h);
		this.curveTo(x + cw_,y - h,x + w_,y - h_);
		this.curveTo(x + w,y - ch_,x + w,y - lh);
		this.lineTo(x + w,y + lh);
		this.closePolygon(false);
	}
	,drawRect: function(x,y,width,height) {
		this.closePolygon(false);
		this.moveTo(x,y);
		this.lineTo(x + width,y);
		this.lineTo(x + width,y + height);
		this.lineTo(x,y + height);
		this.lineTo(x,y);
		this.closePolygon(false);
	}
	,beginFill: function(color,alpha) {
		this.closePolygon(true);
		this.mFillColour = color;
		this.mFillAlpha = alpha == null?1.0:alpha;
		this.mFilling = true;
		this.mSolidGradient = null;
		this.mBitmap = null;
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		this.addLineSegment();
		if(thickness == null) {
			this.jeashClearLine();
			return;
		} else {
			this.mCurrentLine.grad = null;
			this.mCurrentLine.thickness = thickness;
			this.mCurrentLine.colour = color == null?0:color;
			this.mCurrentLine.alpha = alpha == null?1.0:alpha;
			this.mCurrentLine.miter_limit = miterLimit == null?3.0:miterLimit;
			this.mCurrentLine.pixel_hinting = pixelHinting == null || !pixelHinting?0:16384;
		}
		if(caps != null) {
			switch( (caps)[1] ) {
			case 1:
				this.mCurrentLine.caps = 256;
				break;
			case 2:
				this.mCurrentLine.caps = 512;
				break;
			case 0:
				this.mCurrentLine.caps = 0;
				break;
			}
		}
		this.mCurrentLine.scale_mode = 3;
		if(scaleMode != null) {
			switch( (scaleMode)[1] ) {
			case 2:
				this.mCurrentLine.scale_mode = 3;
				break;
			case 3:
				this.mCurrentLine.scale_mode = 1;
				break;
			case 0:
				this.mCurrentLine.scale_mode = 2;
				break;
			case 1:
				this.mCurrentLine.scale_mode = 0;
				break;
			}
		}
		this.mCurrentLine.joints = 0;
		if(joints != null) {
			switch( (joints)[1] ) {
			case 1:
				this.mCurrentLine.joints = 0;
				break;
			case 0:
				this.mCurrentLine.joints = 4096;
				break;
			case 2:
				this.mCurrentLine.joints = 8192;
				break;
			}
		}
	}
	,jeashHitTest: function(inX,inY) {
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.jeashSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx == null) return false;
		ctx.save();
		var _g = 0, _g1 = this.mDrawList;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			ctx.beginPath();
			var _g2 = 0, _g3 = d.points;
			while(_g2 < _g3.length) {
				var p = _g3[_g2];
				++_g2;
				switch(p.type) {
				case 0:
					ctx.moveTo(p.x,p.y);
					break;
				case 2:
					ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
					break;
				default:
					ctx.lineTo(p.x,p.y);
				}
			}
			ctx.closePath();
			if(ctx.isPointInPath(inX,inY)) return true;
		}
		ctx.restore();
		return false;
	}
	,jeashRender: function(maskHandle,filters,sx,sy,clip0,clip1,clip2,clip3) {
		if(sy == null) sy = 1.0;
		if(sx == null) sx = 1.0;
		if(!this.jeashChanged) return false;
		this.closePolygon(true);
		var padding = this._padding;
		if(filters != null) {
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				if(Reflect.hasField(filter,"blurX")) padding += Math.max(Reflect.field(filter,"blurX"),Reflect.field(filter,"blurY")) * 4;
			}
		}
		this.jeashExpandFilteredExtent(-(padding * sx) / 2,-(padding * sy) / 2);
		if(this.jeashClearNextCycle) {
			this.nextDrawIndex = 0;
			this.jeashClearCanvas();
			this.jeashClearNextCycle = false;
			this.jeashAdjustSurface(sx,sy);
		} else if(this.jeashExtentWithFilters.width - this.jeashExtentWithFilters.x > this.jeashSurface.width || this.jeashExtentWithFilters.height - this.jeashExtentWithFilters.y > this.jeashSurface.height) this.jeashAdjustSurface(sx,sy);
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.jeashSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx == null) return false;
		if(clip0 != null) {
			ctx.beginPath();
			ctx.moveTo(clip0.x * sx,clip0.y * sy);
			ctx.lineTo(clip1.x * sx,clip1.y * sy);
			ctx.lineTo(clip2.x * sx,clip2.y * sy);
			ctx.lineTo(clip3.x * sx,clip3.y * sy);
			ctx.closePath();
			ctx.clip();
		}
		if(filters != null) {
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				if(js.Boot.__instanceof(filter,jeash.filters.DropShadowFilter)) filter.jeashApplyFilter(this.jeashSurface,true);
			}
		}
		var len = this.mDrawList.length;
		ctx.save();
		if(this.jeashExtentWithFilters.x != 0 || this.jeashExtentWithFilters.y != 0) ctx.translate(-this.jeashExtentWithFilters.x * sx,-this.jeashExtentWithFilters.y * sy);
		if(sx != 1 || sy != 0) ctx.scale(sx,sy);
		var doStroke = false;
		var _g = this.nextDrawIndex;
		while(_g < len) {
			var i = _g++;
			var d = this.mDrawList[len - 1 - i];
			if(d.lineJobs.length > 0) {
				var _g1 = 0, _g2 = d.lineJobs;
				while(_g1 < _g2.length) {
					var lj = _g2[_g1];
					++_g1;
					ctx.lineWidth = lj.thickness;
					switch(lj.joints) {
					case 0:
						ctx.lineJoin = "round";
						break;
					case 4096:
						ctx.lineJoin = "miter";
						break;
					case 8192:
						ctx.lineJoin = "bevel";
						break;
					}
					switch(lj.caps) {
					case 256:
						ctx.lineCap = "round";
						break;
					case 512:
						ctx.lineCap = "square";
						break;
					case 0:
						ctx.lineCap = "butt";
						break;
					}
					ctx.miterLimit = lj.miter_limit;
					if(lj.grad != null) ctx.strokeStyle = this.createCanvasGradient(ctx,lj.grad); else ctx.strokeStyle = this.createCanvasColor(lj.colour,lj.alpha);
					ctx.beginPath();
					var _g4 = lj.point_idx0, _g3 = lj.point_idx1 + 1;
					while(_g4 < _g3) {
						var i1 = _g4++;
						var p = d.points[i1];
						switch(p.type) {
						case 0:
							ctx.moveTo(p.x,p.y);
							break;
						case 2:
							ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
							break;
						default:
							ctx.lineTo(p.x,p.y);
						}
					}
					ctx.closePath();
					doStroke = true;
				}
			} else {
				ctx.beginPath();
				var _g1 = 0, _g2 = d.points;
				while(_g1 < _g2.length) {
					var p = _g2[_g1];
					++_g1;
					switch(p.type) {
					case 0:
						ctx.moveTo(p.x,p.y);
						break;
					case 2:
						ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
						break;
					default:
						ctx.lineTo(p.x,p.y);
					}
				}
				ctx.closePath();
			}
			var fillColour = d.fillColour;
			var fillAlpha = d.fillAlpha;
			var g = d.solidGradient;
			if(g != null) ctx.fillStyle = this.createCanvasGradient(ctx,g); else ctx.fillStyle = this.createCanvasColor(fillColour,Math.min(1.0,Math.max(0.0,fillAlpha)));
			ctx.fill();
			if(doStroke) ctx.stroke();
			ctx.save();
			var bitmap = d.bitmap;
			if(bitmap != null) {
				var img = bitmap.texture_buffer;
				var m = bitmap.matrix;
				if(m != null) ctx.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
				ctx.drawImage(img,0,0);
			}
			ctx.restore();
		}
		ctx.restore();
		this.jeashChanged = false;
		this.nextDrawIndex = len;
		return true;
	}
	,createCanvasGradient: function(ctx,g) {
		var gradient;
		var matrix = g.matrix;
		if((g.flags & 1) == 0) {
			var p1 = matrix.transformPoint(new jeash.geom.Point(-819.2,0));
			var p2 = matrix.transformPoint(new jeash.geom.Point(819.2,0));
			gradient = ctx.createLinearGradient(p1.x,p1.y,p2.x,p2.y);
		} else {
			var p1 = matrix.transformPoint(new jeash.geom.Point(g.focal * 819.2,0));
			var p2 = matrix.transformPoint(new jeash.geom.Point(0,819.2));
			gradient = ctx.createRadialGradient(p1.x,p1.y,0,p2.x,p1.y,p2.y);
		}
		var _g = 0, _g1 = g.points;
		while(_g < _g1.length) {
			var point = _g1[_g];
			++_g;
			var color = this.createCanvasColor(point.col,point.alpha);
			var pos = point.ratio / 255;
			gradient.addColorStop(pos,color);
		}
		return gradient;
	}
	,createCanvasColor: function(color,alpha) {
		var r;
		var g;
		var b;
		r = (16711680 & color) >> 16;
		g = (65280 & color) >> 8;
		b = 255 & color;
		return "rgba" + "(" + r + "," + g + "," + b + "," + alpha + ")";
	}
	,__class__: jeash.display.Graphics
}
jeash.display.IGraphicsData = function() { }
$hxClasses["jeash.display.IGraphicsData"] = jeash.display.IGraphicsData;
jeash.display.IGraphicsData.__name__ = ["jeash","display","IGraphicsData"];
jeash.display.IGraphicsData.prototype = {
	__class__: jeash.display.IGraphicsData
}
jeash.display.IGraphicsFill = function() { }
$hxClasses["jeash.display.IGraphicsFill"] = jeash.display.IGraphicsFill;
jeash.display.IGraphicsFill.__name__ = ["jeash","display","IGraphicsFill"];
jeash.display.IGraphicsFill.prototype = {
	__class__: jeash.display.IGraphicsFill
}
jeash.display.JointStyle = $hxClasses["jeash.display.JointStyle"] = { __ename__ : true, __constructs__ : ["MITER","ROUND","BEVEL"] }
jeash.display.JointStyle.MITER = ["MITER",0];
jeash.display.JointStyle.MITER.toString = $estr;
jeash.display.JointStyle.MITER.__enum__ = jeash.display.JointStyle;
jeash.display.JointStyle.ROUND = ["ROUND",1];
jeash.display.JointStyle.ROUND.toString = $estr;
jeash.display.JointStyle.ROUND.__enum__ = jeash.display.JointStyle;
jeash.display.JointStyle.BEVEL = ["BEVEL",2];
jeash.display.JointStyle.BEVEL.toString = $estr;
jeash.display.JointStyle.BEVEL.__enum__ = jeash.display.JointStyle;
jeash.display.LineScaleMode = $hxClasses["jeash.display.LineScaleMode"] = { __ename__ : true, __constructs__ : ["HORIZONTAL","NONE","NORMAL","VERTICAL"] }
jeash.display.LineScaleMode.HORIZONTAL = ["HORIZONTAL",0];
jeash.display.LineScaleMode.HORIZONTAL.toString = $estr;
jeash.display.LineScaleMode.HORIZONTAL.__enum__ = jeash.display.LineScaleMode;
jeash.display.LineScaleMode.NONE = ["NONE",1];
jeash.display.LineScaleMode.NONE.toString = $estr;
jeash.display.LineScaleMode.NONE.__enum__ = jeash.display.LineScaleMode;
jeash.display.LineScaleMode.NORMAL = ["NORMAL",2];
jeash.display.LineScaleMode.NORMAL.toString = $estr;
jeash.display.LineScaleMode.NORMAL.__enum__ = jeash.display.LineScaleMode;
jeash.display.LineScaleMode.VERTICAL = ["VERTICAL",3];
jeash.display.LineScaleMode.VERTICAL.toString = $estr;
jeash.display.LineScaleMode.VERTICAL.__enum__ = jeash.display.LineScaleMode;
jeash.display.Loader = function() { }
$hxClasses["jeash.display.Loader"] = jeash.display.Loader;
jeash.display.Loader.__name__ = ["jeash","display","Loader"];
jeash.display.Loader.__super__ = jeash.display.DisplayObjectContainer;
jeash.display.Loader.prototype = $extend(jeash.display.DisplayObjectContainer.prototype,{
	validateBounds: function() {
		if(this.getBoundsInvalid()) {
			jeash.display.DisplayObjectContainer.prototype.validateBounds.call(this);
			if(this.mImage != null) {
				var r = new jeash.geom.Rectangle(0,0,this.mImage.getWidth(),this.mImage.getHeight());
				if(r.width != 0 || r.height != 0) {
					if(this.jeashBoundsRect.width == 0 && this.jeashBoundsRect.height == 0) this.jeashBoundsRect = r.clone(); else this.jeashBoundsRect.extendBounds(r);
				}
			}
			if(this.scale9Grid != null) {
				this.jeashBoundsRect.width *= this.jeashScaleX;
				this.jeashBoundsRect.height *= this.jeashScaleY;
				this.jeashWidth = this.jeashBoundsRect.width;
				this.jeashHeight = this.jeashBoundsRect.height;
			} else {
				this.jeashWidth = this.jeashBoundsRect.width * this.jeashScaleX;
				this.jeashHeight = this.jeashBoundsRect.height * this.jeashScaleY;
			}
		}
	}
	,handleLoad: function(e) {
		this.content.jeashInvalidateBounds();
		this.content.jeashRender(null,null);
		this.contentLoaderInfo.removeEventListener(jeash.events.Event.COMPLETE,$bind(this,this.handleLoad));
	}
	,load: function(request,context) {
		var parts = request.url.split(".");
		var extension = parts.length == 0?"":parts[parts.length - 1].toLowerCase();
		var transparent = true;
		this.contentLoaderInfo.url = request.url;
		this.contentLoaderInfo.contentType = (function($this) {
			var $r;
			switch(extension) {
			case "swf":
				$r = "application/x-shockwave-flash";
				break;
			case "jpg":case "jpeg":
				$r = (function($this) {
					var $r;
					transparent = false;
					$r = "image/jpeg";
					return $r;
				}($this));
				break;
			case "png":
				$r = "image/png";
				break;
			case "gif":
				$r = "image/gif";
				break;
			default:
				$r = (function($this) {
					var $r;
					throw "Unrecognized file " + request.url;
					return $r;
				}($this));
			}
			return $r;
		}(this));
		this.mImage = new jeash.display.BitmapData(0,0,transparent);
		try {
			this.contentLoaderInfo.addEventListener(jeash.events.Event.COMPLETE,$bind(this,this.handleLoad),false,2147483647);
			this.mImage.jeashLoadFromFile(request.url,this.contentLoaderInfo);
			this.content = new jeash.display.Bitmap(this.mImage);
			this.contentLoaderInfo.content = this.content;
			this.addChild(this.content);
		} catch( e ) {
			console.log("Error " + Std.string(e));
			var evt = new jeash.events.IOErrorEvent(jeash.events.IOErrorEvent.IO_ERROR);
			this.contentLoaderInfo.dispatchEvent(evt);
			return;
		}
		if(this.mShape == null) {
			this.mShape = new jeash.display.Shape();
			this.addChild(this.mShape);
		}
	}
	,toString: function() {
		return "[Loader name=" + this.name + " id=" + this._jeashId + "]";
	}
	,__class__: jeash.display.Loader
});
jeash.display.LoaderInfo = function() {
	jeash.events.EventDispatcher.call(this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["jeash.display.LoaderInfo"] = jeash.display.LoaderInfo;
jeash.display.LoaderInfo.__name__ = ["jeash","display","LoaderInfo"];
jeash.display.LoaderInfo.create = function(ldr) {
	var li = new jeash.display.LoaderInfo();
	if(ldr != null) li.loader = ldr;
	return li;
}
jeash.display.LoaderInfo.__super__ = jeash.events.EventDispatcher;
jeash.display.LoaderInfo.prototype = $extend(jeash.events.EventDispatcher.prototype,{
	__class__: jeash.display.LoaderInfo
});
jeash.display.MovieClip = function() {
	jeash.display.Sprite.call(this);
	this.enabled = true;
	this.mCurrentFrame = 0;
	this.mTotalFrames = 0;
	this.loaderInfo = jeash.display.LoaderInfo.create(null);
};
$hxClasses["jeash.display.MovieClip"] = jeash.display.MovieClip;
jeash.display.MovieClip.__name__ = ["jeash","display","MovieClip"];
jeash.display.MovieClip.__super__ = jeash.display.Sprite;
jeash.display.MovieClip.prototype = $extend(jeash.display.Sprite.prototype,{
	toString: function() {
		return "[MovieClip name=" + this.name + " id=" + this._jeashId + "]";
	}
	,GetCurrentFrame: function() {
		return this.mCurrentFrame;
	}
	,GetTotalFrames: function() {
		return this.mTotalFrames;
	}
	,__class__: jeash.display.MovieClip
});
jeash.display.Shape = function() {
	jeash.display.DisplayObject.call(this);
	this.jeashGraphics = new jeash.display.Graphics();
};
$hxClasses["jeash.display.Shape"] = jeash.display.Shape;
jeash.display.Shape.__name__ = ["jeash","display","Shape"];
jeash.display.Shape.__super__ = jeash.display.DisplayObject;
jeash.display.Shape.prototype = $extend(jeash.display.DisplayObject.prototype,{
	jeashGetObjectUnderPoint: function(point) {
		if(this.parent == null) return null;
		if(this.parent.mouseEnabled && jeash.display.DisplayObject.prototype.jeashGetObjectUnderPoint.call(this,point) == this) return this.parent; else return null;
	}
	,jeashGetGraphics: function() {
		return this.jeashGraphics;
	}
	,toString: function() {
		return "[Shape name=" + this.name + " id=" + this._jeashId + "]";
	}
	,__class__: jeash.display.Shape
});
jeash.events.Event = function(inType,inBubbles,inCancelable) {
	if(inCancelable == null) inCancelable = false;
	if(inBubbles == null) inBubbles = false;
	this.type = inType;
	this.bubbles = inBubbles;
	this.cancelable = inCancelable;
	this.jeashIsCancelled = false;
	this.jeashIsCancelledNow = false;
	this.target = null;
	this.currentTarget = null;
	this.eventPhase = jeash.events.EventPhase.AT_TARGET;
};
$hxClasses["jeash.events.Event"] = jeash.events.Event;
jeash.events.Event.__name__ = ["jeash","events","Event"];
jeash.events.Event.prototype = {
	jeashCreateSimilar: function(type,related,targ) {
		var result = new jeash.events.Event(type,this.bubbles,this.cancelable);
		if(targ != null) result.target = targ;
		return result;
	}
	,jeashGetIsCancelledNow: function() {
		return this.jeashIsCancelledNow;
	}
	,jeashGetIsCancelled: function() {
		return this.jeashIsCancelled;
	}
	,jeashSetPhase: function(phase) {
		this.eventPhase = phase;
	}
	,__class__: jeash.events.Event
}
jeash.events.MouseEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	jeash.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.clickCount = clickCount;
};
$hxClasses["jeash.events.MouseEvent"] = jeash.events.MouseEvent;
jeash.events.MouseEvent.__name__ = ["jeash","events","MouseEvent"];
jeash.events.MouseEvent.jeashCreate = function(type,event,local,target) {
	var jeashMouseDown = false;
	var delta = type == jeash.events.MouseEvent.MOUSE_WHEEL?(function($this) {
		var $r;
		var mouseEvent = event;
		$r = mouseEvent.wheelDelta?mouseEvent.wheelDelta / 120 | 0:mouseEvent.detail?-mouseEvent.detail | 0:null;
		return $r;
	}(this)):2;
	if(type == jeash.events.MouseEvent.MOUSE_DOWN) jeashMouseDown = event.which != null?event.which == 1:event.button != null?event.button == 0:false; else if(type == jeash.events.MouseEvent.MOUSE_UP) {
		if(event.which != null) {
			if(event.which == 1) jeashMouseDown = false; else if(event.button != null) {
				if(event.button == 0) jeashMouseDown = false; else jeashMouseDown = false;
			}
		}
	}
	var pseudoEvent = new jeash.events.MouseEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,jeashMouseDown,delta);
	pseudoEvent.stageX = jeash.Lib.jeashGetCurrent().getStage().jeashGetMouseX();
	pseudoEvent.stageY = jeash.Lib.jeashGetCurrent().getStage().jeashGetMouseY();
	pseudoEvent.target = target;
	return pseudoEvent;
}
jeash.events.MouseEvent.__super__ = jeash.events.Event;
jeash.events.MouseEvent.prototype = $extend(jeash.events.Event.prototype,{
	jeashCreateSimilar: function(type,related,targ) {
		var result = new jeash.events.MouseEvent(type,this.bubbles,this.cancelable,this.localX,this.localY,related == null?this.relatedObject:related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey,this.clickCount);
		if(targ != null) result.target = targ;
		return result;
	}
	,__class__: jeash.events.MouseEvent
});
jeash.events.TouchEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	jeash.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.touchPointID = 0;
	this.isPrimaryTouchPoint = true;
};
$hxClasses["jeash.events.TouchEvent"] = jeash.events.TouchEvent;
jeash.events.TouchEvent.__name__ = ["jeash","events","TouchEvent"];
jeash.events.TouchEvent.jeashCreate = function(type,event,touch,local,target) {
	var evt = new jeash.events.TouchEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,false,0,null,0);
	evt.stageX = jeash.Lib.jeashGetCurrent().getStage().jeashGetMouseX();
	evt.stageY = jeash.Lib.jeashGetCurrent().getStage().jeashGetMouseY();
	evt.target = target;
	return evt;
}
jeash.events.TouchEvent.__super__ = jeash.events.Event;
jeash.events.TouchEvent.prototype = $extend(jeash.events.Event.prototype,{
	jeashCreateSimilar: function(type,related,targ) {
		var result = new jeash.events.TouchEvent(type,this.bubbles,this.cancelable,this.localX,this.localY,related == null?this.relatedObject:related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey);
		result.touchPointID = this.touchPointID;
		result.isPrimaryTouchPoint = this.isPrimaryTouchPoint;
		if(targ != null) result.target = targ;
		return result;
	}
	,__class__: jeash.events.TouchEvent
});
jeash.display.Stage = function(width,height) {
	jeash.display.DisplayObjectContainer.call(this);
	this.jeashFocusObject = null;
	this.jeashWindowWidth = width;
	this.jeashWindowHeight = height;
	this.stageFocusRect = false;
	this.scaleMode = jeash.display.StageScaleMode.SHOW_ALL;
	this.jeashStageMatrix = new jeash.geom.Matrix();
	this.tabEnabled = true;
	this.jeashSetFrameRate(60.0);
	this.jeashSetBackgroundColour(16777215);
	this.name = "Stage";
	this.loaderInfo = jeash.display.LoaderInfo.create(null);
	this.loaderInfo.parameters.width = Std.string(this.jeashWindowWidth);
	this.loaderInfo.parameters.height = Std.string(this.jeashWindowHeight);
	this.jeashPointInPathMode = jeash.display.Graphics.jeashDetectIsPointInPathMode();
	this.jeashMouseOverObjects = [];
	this.jeashSetShowDefaultContextMenu(true);
	this.jeashTouchInfo = [];
	this.jeashFocusOverObjects = [];
	this.jeashUIEventsQueue = new Array(1000);
	this.jeashUIEventsQueueIndex = 0;
};
$hxClasses["jeash.display.Stage"] = jeash.display.Stage;
jeash.display.Stage.__name__ = ["jeash","display","Stage"];
jeash.display.Stage.__super__ = jeash.display.DisplayObjectContainer;
jeash.display.Stage.prototype = $extend(jeash.display.DisplayObjectContainer.prototype,{
	jeashSetDisplayState: function(displayState) {
		if(displayState != this.displayState && this.displayState != null) {
			switch( (displayState)[1] ) {
			case 1:
				jeash.Lib.jeashDisableFullScreen();
				break;
			case 0:
				jeash.Lib.jeashEnableFullScreen();
				break;
			}
		}
		this.displayState = displayState;
		return displayState;
	}
	,jeashSetShowDefaultContextMenu: function(showDefaultContextMenu) {
		if(showDefaultContextMenu != this.jeashShowDefaultContextMenu && this.jeashShowDefaultContextMenu != null) {
			if(!showDefaultContextMenu) jeash.Lib.jeashDisableRightClick(); else jeash.Lib.jeashEnableRightClick();
		}
		this.jeashShowDefaultContextMenu = showDefaultContextMenu;
		return showDefaultContextMenu;
	}
	,jeashGetMouseY: function() {
		return this._mouseY;
	}
	,jeashGetMouseX: function() {
		return this._mouseX;
	}
	,jeashStageRender: function(_) {
		if(!this.jeashStageActive) {
			this.jeashOnResize(this.jeashWindowWidth,this.jeashWindowHeight);
			var event = new jeash.events.Event(jeash.events.Event.ACTIVATE);
			event.target = this;
			this.jeashBroadcast(event);
			this.jeashStageActive = true;
		}
		var _g1 = 0, _g = this.jeashUIEventsQueueIndex;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.jeashUIEventsQueue[i] != null) this.jeashProcessStageEvent(this.jeashUIEventsQueue[i]);
		}
		this.jeashUIEventsQueueIndex = 0;
		var event = new jeash.events.Event(jeash.events.Event.ENTER_FRAME);
		this.jeashBroadcast(event);
		this.jeashRenderAll();
		var event1 = new jeash.events.Event(jeash.events.Event.RENDER);
		this.jeashBroadcast(event1);
	}
	,jeashUpdateNextWake: function() {
		var window = js.Lib.window;
		window.clearInterval(this.jeashTimer);
		this.jeashTimer = window.setInterval($bind(this,this.jeashStageRender),this.jeashInterval,[]);
	}
	,jeashSetFrameRate: function(speed) {
		var window = js.Lib.window;
		this.jeashInterval = 1000.0 / speed | 0;
		this.jeashUpdateNextWake();
		this.jeashFrameRate = speed;
		return speed;
	}
	,jeashGetFrameRate: function() {
		return this.jeashFrameRate;
	}
	,jeashGetQuality: function() {
		return this.quality != null?this.quality:jeash.display.StageQuality.BEST;
	}
	,jeashSetQuality: function(inQuality) {
		this.quality = inQuality;
		return inQuality;
	}
	,jeashRenderAll: function() {
		this.jeashRender(null,null);
	}
	,jeashGetFocus: function() {
		return this.jeashFocusObject;
	}
	,jeashSetFocus: function(inObj) {
		return this.jeashFocusObject = inObj;
	}
	,jeashSetBackgroundColour: function(col) {
		this.jeashBackgroundColour = col;
		return col;
	}
	,jeashGetBackgroundColour: function() {
		return this.jeashBackgroundColour;
	}
	,jeashOnResize: function(inW,inH) {
		this.jeashWindowWidth = inW;
		this.jeashWindowHeight = inH;
		var event = new jeash.events.Event(jeash.events.Event.RESIZE);
		event.target = this;
		this.jeashBroadcast(event);
	}
	,jeashOnKey: function(code,pressed,inChar,ctrl,alt,shift) {
		var event = new jeash.events.KeyboardEvent(pressed?jeash.events.KeyboardEvent.KEY_DOWN:jeash.events.KeyboardEvent.KEY_UP,true,false,inChar,code,shift || ctrl?1:0,ctrl,alt,shift);
		this.dispatchEvent(event);
	}
	,jeashOnTouch: function(event,touch,type,touchInfo,isPrimaryTouchPoint) {
		var point = new jeash.geom.Point(touch.pageX - jeash.Lib.mMe.__scr.offsetLeft + window.pageXOffset,touch.pageY - jeash.Lib.mMe.__scr.offsetTop + window.pageYOffset);
		var obj = this.jeashGetObjectUnderPoint(point);
		this._mouseX = point.x;
		this._mouseY = point.y;
		var stack = new Array();
		if(obj != null) obj.jeashGetInteractiveObjectStack(stack);
		if(stack.length > 0) {
			stack.reverse();
			var local = obj.globalToLocal(point);
			var evt = jeash.events.TouchEvent.jeashCreate(type,event,touch,local,obj);
			evt.touchPointID = touch.identifier;
			evt.isPrimaryTouchPoint = isPrimaryTouchPoint;
			this.jeashCheckInOuts(evt,stack,touchInfo);
			obj.jeashFireEvent(evt);
			var mouseType = (function($this) {
				var $r;
				switch(type) {
				case jeash.events.TouchEvent.TOUCH_BEGIN:
					$r = jeash.events.MouseEvent.MOUSE_DOWN;
					break;
				case jeash.events.TouchEvent.TOUCH_END:
					$r = jeash.events.MouseEvent.MOUSE_UP;
					break;
				default:
					$r = (function($this) {
						var $r;
						if($this.jeashDragObject != null) $this.jeashDrag(point);
						$r = jeash.events.MouseEvent.MOUSE_MOVE;
						return $r;
					}($this));
				}
				return $r;
			}(this));
			obj.jeashFireEvent(jeash.events.MouseEvent.jeashCreate(mouseType,evt,local,obj));
		} else {
			var evt = jeash.events.TouchEvent.jeashCreate(type,event,touch,point,null);
			evt.touchPointID = touch.identifier;
			evt.isPrimaryTouchPoint = isPrimaryTouchPoint;
			this.jeashCheckInOuts(evt,stack,touchInfo);
		}
	}
	,jeashOnMouse: function(event,type) {
		var point = new jeash.geom.Point(event.clientX - jeash.Lib.mMe.__scr.offsetLeft + window.pageXOffset,event.clientY - jeash.Lib.mMe.__scr.offsetTop + window.pageYOffset);
		if(this.jeashDragObject != null) this.jeashDrag(point);
		var obj = this.jeashGetObjectUnderPoint(point);
		this._mouseX = point.x;
		this._mouseY = point.y;
		var stack = new Array();
		if(obj != null) obj.jeashGetInteractiveObjectStack(stack);
		if(stack.length > 0) {
			stack.reverse();
			var local = obj.globalToLocal(point);
			var evt = jeash.events.MouseEvent.jeashCreate(type,event,local,obj);
			this.jeashCheckInOuts(evt,stack);
			if(type == jeash.events.MouseEvent.MOUSE_DOWN) this.jeashCheckFocusInOuts(evt,stack);
			obj.jeashFireEvent(evt);
		} else {
			var evt = jeash.events.MouseEvent.jeashCreate(type,event,point,null);
			this.jeashCheckInOuts(evt,stack);
			if(type == jeash.events.MouseEvent.MOUSE_DOWN) this.jeashCheckFocusInOuts(evt,stack);
		}
	}
	,jeashHandleOrientationChange: function() {
	}
	,jeashHandleAccelerometer: function(evt) {
		jeash.display.Stage.jeashAcceleration.x = evt.accelerationIncludingGravity.x;
		jeash.display.Stage.jeashAcceleration.y = evt.accelerationIncludingGravity.y;
		jeash.display.Stage.jeashAcceleration.z = evt.accelerationIncludingGravity.z;
	}
	,jeashProcessStageEvent: function(evt) {
		evt.stopPropagation();
		switch(evt.type) {
		case "resize":
			this.jeashOnResize(jeash.Lib.jeashGetWidth(),jeash.Lib.jeashGetHeight());
			break;
		case "mousemove":
			this.jeashOnMouse(evt,jeash.events.MouseEvent.MOUSE_MOVE);
			break;
		case "mousedown":
			this.jeashOnMouse(evt,jeash.events.MouseEvent.MOUSE_DOWN);
			break;
		case "mouseup":
			this.jeashOnMouse(evt,jeash.events.MouseEvent.MOUSE_UP);
			break;
		case "click":
			this.jeashOnMouse(evt,jeash.events.MouseEvent.CLICK);
			break;
		case "mousewheel":
			this.jeashOnMouse(evt,jeash.events.MouseEvent.MOUSE_WHEEL);
			break;
		case "dblclick":
			this.jeashOnMouse(evt,jeash.events.MouseEvent.DOUBLE_CLICK);
			break;
		case "keydown":
			var evt1 = evt;
			var keyCode = evt1.keyIdentifier != null?(function($this) {
				var $r;
				try {
					$r = jeash.ui.Keyboard.jeashConvertWebkitCode(evt1.keyIdentifier);
				} catch( e ) {
					$r = evt1.keyCode;
				}
				return $r;
			}(this)):jeash.ui.Keyboard.jeashConvertMozillaCode(evt1.keyCode);
			this.jeashOnKey(keyCode,true,evt1.keyLocation,evt1.ctrlKey,evt1.altKey,evt1.shiftKey);
			break;
		case "keyup":
			var evt1 = evt;
			var keyCode = evt1.keyIdentifier != null?(function($this) {
				var $r;
				try {
					$r = jeash.ui.Keyboard.jeashConvertWebkitCode(evt1.keyIdentifier);
				} catch( e ) {
					$r = evt1.keyCode;
				}
				return $r;
			}(this)):jeash.ui.Keyboard.jeashConvertMozillaCode(evt1.keyCode);
			this.jeashOnKey(keyCode,false,evt1.keyLocation,evt1.ctrlKey,evt1.altKey,evt1.shiftKey);
			break;
		case "touchstart":
			var evt1 = evt;
			evt1.preventDefault();
			var touchInfo = new jeash.display._Stage.TouchInfo();
			this.jeashTouchInfo[evt1.changedTouches[0].identifier] = touchInfo;
			this.jeashOnTouch(evt1,evt1.changedTouches[0],jeash.events.TouchEvent.TOUCH_BEGIN,touchInfo,false);
			break;
		case "touchmove":
			var evt1 = evt;
			var touchInfo = this.jeashTouchInfo[evt1.changedTouches[0].identifier];
			this.jeashOnTouch(evt1,evt1.changedTouches[0],jeash.events.TouchEvent.TOUCH_MOVE,touchInfo,true);
			break;
		case "touchend":
			var evt1 = evt;
			var touchInfo = this.jeashTouchInfo[evt1.changedTouches[0].identifier];
			this.jeashOnTouch(evt1,evt1.changedTouches[0],jeash.events.TouchEvent.TOUCH_END,touchInfo,true);
			this.jeashTouchInfo[evt1.changedTouches[0].identifier] = null;
			break;
		case "devicemotion":
			var evt1 = evt;
			this.jeashHandleAccelerometer(evt1);
			break;
		case "orientationchange":
			this.jeashHandleOrientationChange();
			break;
		default:
		}
	}
	,jeashQueueStageEvent: function(evt) {
		this.jeashUIEventsQueue[this.jeashUIEventsQueueIndex++] = evt;
	}
	,jeashCheckInOuts: function(event,stack,touchInfo) {
		var prev = touchInfo == null?this.jeashMouseOverObjects:touchInfo.touchOverObjects;
		var events = touchInfo == null?jeash.display.Stage.jeashMouseChanges:jeash.display.Stage.jeashTouchChanges;
		var new_n = stack.length;
		var new_obj = new_n > 0?stack[new_n - 1]:null;
		var old_n = prev.length;
		var old_obj = old_n > 0?prev[old_n - 1]:null;
		if(new_obj != old_obj) {
			if(old_obj != null) old_obj.jeashFireEvent(event.jeashCreateSimilar(events[0],new_obj,old_obj));
			if(new_obj != null) new_obj.jeashFireEvent(event.jeashCreateSimilar(events[1],old_obj,new_obj));
			var common = 0;
			while(common < new_n && common < old_n && stack[common] == prev[common]) common++;
			var rollOut = event.jeashCreateSimilar(events[2],new_obj,old_obj);
			var i = old_n - 1;
			while(i >= common) {
				prev[i].dispatchEvent(rollOut);
				i--;
			}
			var rollOver = event.jeashCreateSimilar(events[3],old_obj);
			var i1 = new_n - 1;
			while(i1 >= common) {
				stack[i1].dispatchEvent(rollOver);
				i1--;
			}
			if(touchInfo == null) this.jeashMouseOverObjects = stack; else touchInfo.touchOverObjects = stack;
		}
	}
	,jeashCheckFocusInOuts: function(event,inStack) {
		var new_n = inStack.length;
		var new_obj = new_n > 0?inStack[new_n - 1]:null;
		var old_n = this.jeashFocusOverObjects.length;
		var old_obj = old_n > 0?this.jeashFocusOverObjects[old_n - 1]:null;
		if(new_obj != old_obj) {
			var common = 0;
			while(common < new_n && common < old_n && inStack[common] == this.jeashFocusOverObjects[common]) common++;
			var focusOut = new jeash.events.FocusEvent(jeash.events.FocusEvent.FOCUS_OUT,false,false,new_obj,false,0);
			var i = old_n - 1;
			while(i >= common) {
				this.jeashFocusOverObjects[i].dispatchEvent(focusOut);
				i--;
			}
			var focusIn = new jeash.events.FocusEvent(jeash.events.FocusEvent.FOCUS_IN,false,false,old_obj,false,0);
			var i1 = new_n - 1;
			while(i1 >= common) {
				inStack[i1].dispatchEvent(focusIn);
				i1--;
			}
			this.jeashFocusOverObjects = inStack;
			this.jeashSetFocus(new_obj);
		}
	}
	,jeashDrag: function(point) {
		var p = this.jeashDragObject.parent;
		if(p != null) point = p.globalToLocal(point);
		var x = point.x + this.jeashDragOffsetX;
		var y = point.y + this.jeashDragOffsetY;
		if(this.jeashDragBounds != null) {
			if(x < this.jeashDragBounds.x) x = this.jeashDragBounds.x; else if(x > this.jeashDragBounds.get_right()) x = this.jeashDragBounds.get_right();
			if(y < this.jeashDragBounds.y) y = this.jeashDragBounds.y; else if(y > this.jeashDragBounds.get_bottom()) y = this.jeashDragBounds.get_bottom();
		}
		this.jeashDragObject.jeashSetX(x);
		this.jeashDragObject.jeashSetY(y);
	}
	,getStage: function() {
		return jeash.Lib.jeashGetStage();
	}
	,toString: function() {
		return "[Stage id=" + this._jeashId + "]";
	}
	,jeashGetStageHeight: function() {
		return this.jeashWindowHeight;
	}
	,jeashGetStageWidth: function() {
		return this.jeashWindowWidth;
	}
	,__class__: jeash.display.Stage
});
jeash.display._Stage = {}
jeash.display._Stage.TouchInfo = function() {
	this.touchOverObjects = [];
};
$hxClasses["jeash.display._Stage.TouchInfo"] = jeash.display._Stage.TouchInfo;
jeash.display._Stage.TouchInfo.__name__ = ["jeash","display","_Stage","TouchInfo"];
jeash.display._Stage.TouchInfo.prototype = {
	__class__: jeash.display._Stage.TouchInfo
}
jeash.display.StageAlign = $hxClasses["jeash.display.StageAlign"] = { __ename__ : true, __constructs__ : ["TOP_RIGHT","TOP_LEFT","TOP","RIGHT","LEFT","BOTTOM_RIGHT","BOTTOM_LEFT","BOTTOM"] }
jeash.display.StageAlign.TOP_RIGHT = ["TOP_RIGHT",0];
jeash.display.StageAlign.TOP_RIGHT.toString = $estr;
jeash.display.StageAlign.TOP_RIGHT.__enum__ = jeash.display.StageAlign;
jeash.display.StageAlign.TOP_LEFT = ["TOP_LEFT",1];
jeash.display.StageAlign.TOP_LEFT.toString = $estr;
jeash.display.StageAlign.TOP_LEFT.__enum__ = jeash.display.StageAlign;
jeash.display.StageAlign.TOP = ["TOP",2];
jeash.display.StageAlign.TOP.toString = $estr;
jeash.display.StageAlign.TOP.__enum__ = jeash.display.StageAlign;
jeash.display.StageAlign.RIGHT = ["RIGHT",3];
jeash.display.StageAlign.RIGHT.toString = $estr;
jeash.display.StageAlign.RIGHT.__enum__ = jeash.display.StageAlign;
jeash.display.StageAlign.LEFT = ["LEFT",4];
jeash.display.StageAlign.LEFT.toString = $estr;
jeash.display.StageAlign.LEFT.__enum__ = jeash.display.StageAlign;
jeash.display.StageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",5];
jeash.display.StageAlign.BOTTOM_RIGHT.toString = $estr;
jeash.display.StageAlign.BOTTOM_RIGHT.__enum__ = jeash.display.StageAlign;
jeash.display.StageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",6];
jeash.display.StageAlign.BOTTOM_LEFT.toString = $estr;
jeash.display.StageAlign.BOTTOM_LEFT.__enum__ = jeash.display.StageAlign;
jeash.display.StageAlign.BOTTOM = ["BOTTOM",7];
jeash.display.StageAlign.BOTTOM.toString = $estr;
jeash.display.StageAlign.BOTTOM.__enum__ = jeash.display.StageAlign;
jeash.display.StageDisplayState = $hxClasses["jeash.display.StageDisplayState"] = { __ename__ : true, __constructs__ : ["FULL_SCREEN","NORMAL"] }
jeash.display.StageDisplayState.FULL_SCREEN = ["FULL_SCREEN",0];
jeash.display.StageDisplayState.FULL_SCREEN.toString = $estr;
jeash.display.StageDisplayState.FULL_SCREEN.__enum__ = jeash.display.StageDisplayState;
jeash.display.StageDisplayState.NORMAL = ["NORMAL",1];
jeash.display.StageDisplayState.NORMAL.toString = $estr;
jeash.display.StageDisplayState.NORMAL.__enum__ = jeash.display.StageDisplayState;
jeash.display.StageQuality = function() { }
$hxClasses["jeash.display.StageQuality"] = jeash.display.StageQuality;
jeash.display.StageQuality.__name__ = ["jeash","display","StageQuality"];
jeash.display.StageScaleMode = $hxClasses["jeash.display.StageScaleMode"] = { __ename__ : true, __constructs__ : ["SHOW_ALL","NO_SCALE","NO_BORDER","EXACT_FIT"] }
jeash.display.StageScaleMode.SHOW_ALL = ["SHOW_ALL",0];
jeash.display.StageScaleMode.SHOW_ALL.toString = $estr;
jeash.display.StageScaleMode.SHOW_ALL.__enum__ = jeash.display.StageScaleMode;
jeash.display.StageScaleMode.NO_SCALE = ["NO_SCALE",1];
jeash.display.StageScaleMode.NO_SCALE.toString = $estr;
jeash.display.StageScaleMode.NO_SCALE.__enum__ = jeash.display.StageScaleMode;
jeash.display.StageScaleMode.NO_BORDER = ["NO_BORDER",2];
jeash.display.StageScaleMode.NO_BORDER.toString = $estr;
jeash.display.StageScaleMode.NO_BORDER.__enum__ = jeash.display.StageScaleMode;
jeash.display.StageScaleMode.EXACT_FIT = ["EXACT_FIT",3];
jeash.display.StageScaleMode.EXACT_FIT.toString = $estr;
jeash.display.StageScaleMode.EXACT_FIT.__enum__ = jeash.display.StageScaleMode;
jeash.events.Listener = function(inListener,inUseCapture,inPriority) {
	this.mListner = inListener;
	this.mUseCapture = inUseCapture;
	this.mPriority = inPriority;
	this.mID = jeash.events.Listener.sIDs++;
};
$hxClasses["jeash.events.Listener"] = jeash.events.Listener;
jeash.events.Listener.__name__ = ["jeash","events","Listener"];
jeash.events.Listener.prototype = {
	dispatchEvent: function(event) {
		this.mListner(event);
	}
	,Is: function(inListener,inCapture) {
		return Reflect.compareMethods(this.mListner,inListener) && this.mUseCapture == inCapture;
	}
	,__class__: jeash.events.Listener
}
jeash.events.EventPhase = function() { }
$hxClasses["jeash.events.EventPhase"] = jeash.events.EventPhase;
jeash.events.EventPhase.__name__ = ["jeash","events","EventPhase"];
jeash.events.FocusEvent = function(type,bubbles,cancelable,inObject,inShiftKey,inKeyCode) {
	jeash.events.Event.call(this,type,bubbles,cancelable);
	this.keyCode = inKeyCode;
	this.shiftKey = inShiftKey == null?false:inShiftKey;
	this.target = inObject;
};
$hxClasses["jeash.events.FocusEvent"] = jeash.events.FocusEvent;
jeash.events.FocusEvent.__name__ = ["jeash","events","FocusEvent"];
jeash.events.FocusEvent.__super__ = jeash.events.Event;
jeash.events.FocusEvent.prototype = $extend(jeash.events.Event.prototype,{
	__class__: jeash.events.FocusEvent
});
jeash.events.HTTPStatusEvent = function(type,bubbles,cancelable,status) {
	if(status == null) status = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.status = status;
	jeash.events.Event.call(this,type,bubbles,cancelable);
};
$hxClasses["jeash.events.HTTPStatusEvent"] = jeash.events.HTTPStatusEvent;
jeash.events.HTTPStatusEvent.__name__ = ["jeash","events","HTTPStatusEvent"];
jeash.events.HTTPStatusEvent.__super__ = jeash.events.Event;
jeash.events.HTTPStatusEvent.prototype = $extend(jeash.events.Event.prototype,{
	__class__: jeash.events.HTTPStatusEvent
});
jeash.events.IOErrorEvent = function(type,bubbles,cancelable,inText) {
	if(inText == null) inText = "";
	jeash.events.Event.call(this,type,bubbles,cancelable);
	this.text = inText;
};
$hxClasses["jeash.events.IOErrorEvent"] = jeash.events.IOErrorEvent;
jeash.events.IOErrorEvent.__name__ = ["jeash","events","IOErrorEvent"];
jeash.events.IOErrorEvent.__super__ = jeash.events.Event;
jeash.events.IOErrorEvent.prototype = $extend(jeash.events.Event.prototype,{
	__class__: jeash.events.IOErrorEvent
});
jeash.events.KeyboardEvent = function(type,bubbles,cancelable,inCharCode,inKeyCode,inKeyLocation,inCtrlKey,inAltKey,inShiftKey) {
	jeash.events.Event.call(this,type,bubbles,cancelable);
	this.keyCode = inKeyCode;
	this.keyLocation = inKeyLocation == null?0:inKeyLocation;
	this.charCode = inCharCode == null?0:inCharCode;
	this.shiftKey = inShiftKey == null?false:inShiftKey;
	this.altKey = inAltKey == null?false:inAltKey;
	this.ctrlKey = inCtrlKey == null?false:inCtrlKey;
};
$hxClasses["jeash.events.KeyboardEvent"] = jeash.events.KeyboardEvent;
jeash.events.KeyboardEvent.__name__ = ["jeash","events","KeyboardEvent"];
jeash.events.KeyboardEvent.__super__ = jeash.events.Event;
jeash.events.KeyboardEvent.prototype = $extend(jeash.events.Event.prototype,{
	__class__: jeash.events.KeyboardEvent
});
jeash.events.ProgressEvent = function(type,bubbles,cancelable,bytesLoaded,bytesTotal) {
	if(bytesTotal == null) bytesTotal = 0;
	if(bytesLoaded == null) bytesLoaded = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	jeash.events.Event.call(this,type,bubbles,cancelable);
	this.bytesLoaded = bytesLoaded;
	this.bytesTotal = bytesTotal;
};
$hxClasses["jeash.events.ProgressEvent"] = jeash.events.ProgressEvent;
jeash.events.ProgressEvent.__name__ = ["jeash","events","ProgressEvent"];
jeash.events.ProgressEvent.__super__ = jeash.events.Event;
jeash.events.ProgressEvent.prototype = $extend(jeash.events.Event.prototype,{
	__class__: jeash.events.ProgressEvent
});
jeash.filters = {}
jeash.filters.BitmapFilter = function(inType) {
	this._mType = inType;
};
$hxClasses["jeash.filters.BitmapFilter"] = jeash.filters.BitmapFilter;
jeash.filters.BitmapFilter.__name__ = ["jeash","filters","BitmapFilter"];
jeash.filters.BitmapFilter.prototype = {
	jeashApplyFilter: function(surface,refreshCache) {
	}
	,clone: function() {
		throw "Implement in subclass. BitmapFilter::clone";
		return null;
	}
	,__class__: jeash.filters.BitmapFilter
}
jeash.filters.DropShadowFilter = function(in_distance,in_angle,in_color,in_alpha,in_blurX,in_blurY,in_strength,in_quality,in_inner,in_knockout,in_hideObject) {
	if(in_hideObject == null) in_hideObject = false;
	if(in_knockout == null) in_knockout = false;
	if(in_inner == null) in_inner = false;
	if(in_quality == null) in_quality = 1;
	if(in_strength == null) in_strength = 1.0;
	if(in_blurY == null) in_blurY = 4.0;
	if(in_blurX == null) in_blurX = 4.0;
	if(in_alpha == null) in_alpha = 1.0;
	if(in_color == null) in_color = 0;
	if(in_angle == null) in_angle = 45.0;
	if(in_distance == null) in_distance = 4.0;
	jeash.filters.BitmapFilter.call(this,"DropShadowFilter");
	this.distance = in_distance;
	this.angle = in_angle;
	this.color = in_color;
	this.alpha = in_alpha;
	this.blurX = in_blurX;
	this.blurY = in_blurX;
	this.strength = in_strength;
	this.quality = in_quality;
	this.inner = in_inner;
	this.knockout = in_knockout;
	this.hideObject = in_hideObject;
	this._jeashCached = false;
};
$hxClasses["jeash.filters.DropShadowFilter"] = jeash.filters.DropShadowFilter;
jeash.filters.DropShadowFilter.__name__ = ["jeash","filters","DropShadowFilter"];
jeash.filters.DropShadowFilter.__super__ = jeash.filters.BitmapFilter;
jeash.filters.DropShadowFilter.prototype = $extend(jeash.filters.BitmapFilter.prototype,{
	jeashApplyFilter: function(surface,refreshCache) {
		if(!this._jeashCached || refreshCache) {
			var distanceX = this.distance * Math.sin(2 * Math.PI * this.angle / 360.0);
			var distanceY = this.distance * Math.cos(2 * Math.PI * this.angle / 360.0);
			var blurRadius = Math.max(this.blurX,this.blurY);
			var context = surface.getContext("2d");
			context.shadowOffsetX = distanceX;
			context.shadowOffsetY = distanceY;
			context.shadowBlur = blurRadius;
			context.shadowColor = "#" + StringTools.hex(this.color,6);
			this._jeashCached = true;
		}
	}
	,clone: function() {
		return new jeash.filters.DropShadowFilter(this.distance,this.angle,this.color,this.alpha,this.blurX,this.blurY,this.strength,this.quality,this.inner,this.knockout,this.hideObject);
	}
	,__class__: jeash.filters.DropShadowFilter
});
jeash.geom = {}
jeash.geom.ColorTransform = function(inRedMultiplier,inGreenMultiplier,inBlueMultiplier,inAlphaMultiplier,inRedOffset,inGreenOffset,inBlueOffset,inAlphaOffset) {
	this.redMultiplier = inRedMultiplier == null?1.0:inRedMultiplier;
	this.greenMultiplier = inGreenMultiplier == null?1.0:inGreenMultiplier;
	this.blueMultiplier = inBlueMultiplier == null?1.0:inBlueMultiplier;
	this.alphaMultiplier = inAlphaMultiplier == null?1.0:inAlphaMultiplier;
	this.redOffset = inRedOffset == null?0.0:inRedOffset;
	this.greenOffset = inGreenOffset == null?0.0:inGreenOffset;
	this.blueOffset = inBlueOffset == null?0.0:inBlueOffset;
	this.alphaOffset = inAlphaOffset == null?0.0:inAlphaOffset;
};
$hxClasses["jeash.geom.ColorTransform"] = jeash.geom.ColorTransform;
jeash.geom.ColorTransform.__name__ = ["jeash","geom","ColorTransform"];
jeash.geom.ColorTransform.prototype = {
	jeashSetColor: function(value) {
		this.redOffset = value >> 16 & 255;
		this.greenOffset = value >> 8 & 255;
		this.blueOffset = value & 255;
		this.redMultiplier = 0;
		this.greenMultiplier = 0;
		this.blueMultiplier = 0;
		return this.jeashGetColor();
	}
	,jeashGetColor: function() {
		return (this.redOffset | 0) << 16 | (this.greenOffset | 0) << 8 | (this.blueOffset | 0);
	}
	,__class__: jeash.geom.ColorTransform
}
jeash.geom.Matrix = function(in_a,in_b,in_c,in_d,in_tx,in_ty) {
	this.a = in_a == null?1.0:in_a;
	this.b = in_b == null?0.0:in_b;
	this.c = in_c == null?0.0:in_c;
	this.d = in_d == null?1.0:in_d;
	this.setTx(in_tx == null?0.0:in_tx);
	this.setTy(in_ty == null?0.0:in_ty);
	this._sx = 1.0;
	this._sy = 1.0;
};
$hxClasses["jeash.geom.Matrix"] = jeash.geom.Matrix;
jeash.geom.Matrix.__name__ = ["jeash","geom","Matrix"];
jeash.geom.Matrix.prototype = {
	to3DString: function() {
		var m = "matrix3d(";
		m += this.a;
		m += ", ";
		m += this.b;
		m += ", ";
		m += "0, 0, ";
		m += this.c;
		m += ", ";
		m += this.d;
		m += ", ";
		m += "0, 0, 0, 0, 1, 0, ";
		m += this.tx;
		m += ", ";
		m += this.ty;
		m += ", ";
		m += "0, 1";
		m += ")";
		return m;
	}
	,toString: function() {
		var m = "matrix(";
		m += this.a;
		m += ", ";
		m += this.b;
		m += ", ";
		m += this.c;
		m += ", ";
		m += this.d;
		m += ", ";
		m += this.tx;
		m += ", ";
		m += this.ty;
		m += ")";
		return m;
	}
	,toMozString: function() {
		var m = "matrix(";
		m += this.a;
		m += ", ";
		m += this.b;
		m += ", ";
		m += this.c;
		m += ", ";
		m += this.d;
		m += ", ";
		m += this.tx;
		m += "px, ";
		m += this.ty;
		m += "px)";
		return m;
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.setTx(0);
		this.setTy(0);
		this._sx = 1.0;
		this._sy = 1.0;
	}
	,mult: function(m) {
		var result = this.clone();
		result.concat(m);
		return result;
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.setTy(this.tx * m.b + this.ty * m.d + m.ty);
		this.setTx(tx1);
		this._sx *= m._sx;
		this._sy *= m._sy;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.setTx(Math.round(this.tx * 10) / 10);
		this.setTy(Math.round(this.ty * 10) / 10);
	}
	,scale: function(inSX,inSY) {
		this._sx = inSX;
		this._sy = inSY;
		this.a *= inSX;
		this.b *= inSY;
		this.c *= inSX;
		this.d *= inSY;
		var _g = this;
		_g.setTx(_g.tx * inSX);
		var _g = this;
		_g.setTy(_g.ty * inSY);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.setTx(Math.round(this.tx * 10) / 10);
		this.setTy(Math.round(this.ty * 10) / 10);
	}
	,rotate: function(inTheta) {
		var cos = Math.cos(inTheta);
		var sin = Math.sin(inTheta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.setTy(this.tx * sin + this.ty * cos);
		this.setTx(tx1);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.setTx(Math.round(this.tx * 10) / 10);
		this.setTy(Math.round(this.ty * 10) / 10);
	}
	,setTy: function(inValue) {
		this.ty = inValue;
		return this.ty;
	}
	,setTx: function(inValue) {
		this.tx = inValue;
		return this.tx;
	}
	,translate: function(inDX,inDY) {
		var m = new jeash.geom.Matrix();
		m.setTx(inDX);
		m.setTy(inDY);
		this.concat(m);
	}
	,jeashTranslateTransformed: function(inPos) {
		this.setTx(inPos.x * this.a + inPos.y * this.c + this.tx);
		this.setTy(inPos.x * this.b + inPos.y * this.d + this.ty);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.setTx(Math.round(this.tx * 10) / 10);
		this.setTy(Math.round(this.ty * 10) / 10);
	}
	,transformPoint: function(inPos) {
		return new jeash.geom.Point(inPos.x * this.a + inPos.y * this.c + this.tx,inPos.x * this.b + inPos.y * this.d + this.ty);
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.setTx(-this.tx);
			this.setTy(-this.ty);
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.setTy(-this.b * this.tx - this.d * this.ty);
			this.setTx(tx1);
		}
		this._sx /= this._sx;
		this._sy /= this._sy;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.setTx(Math.round(this.tx * 10) / 10);
		this.setTy(Math.round(this.ty * 10) / 10);
		return this;
	}
	,copy: function(m) {
		this.a = m.a;
		this.b = m.b;
		this.c = m.c;
		this.d = m.d;
		this.setTx(m.tx);
		this.setTy(m.ty);
		this._sx = m._sx;
		this._sy = m._sy;
	}
	,clone: function() {
		var m = new jeash.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
		m._sx = this._sx;
		m._sy = this._sy;
		return m;
	}
	,__class__: jeash.geom.Matrix
}
jeash.geom.Point = function(inX,inY) {
	this.x = inX == null?0.0:inX;
	this.y = inY == null?0.0:inY;
};
$hxClasses["jeash.geom.Point"] = jeash.geom.Point;
jeash.geom.Point.__name__ = ["jeash","geom","Point"];
jeash.geom.Point.prototype = {
	get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,clone: function() {
		return new jeash.geom.Point(this.x,this.y);
	}
	,__class__: jeash.geom.Point
}
jeash.geom.Rectangle = function(inX,inY,inWidth,inHeight) {
	if(inHeight == null) inHeight = 0.;
	if(inWidth == null) inWidth = 0.;
	if(inY == null) inY = 0.;
	if(inX == null) inX = 0.;
	this.x = inX;
	this.y = inY;
	this.width = inWidth;
	this.height = inHeight;
};
$hxClasses["jeash.geom.Rectangle"] = jeash.geom.Rectangle;
jeash.geom.Rectangle.__name__ = ["jeash","geom","Rectangle"];
jeash.geom.Rectangle.prototype = {
	extendBounds: function(r) {
		var dx = this.x - r.x;
		if(dx > 0) {
			this.x -= dx;
			this.width += dx;
		}
		var dy = this.y - r.y;
		if(dy > 0) {
			this.y -= dy;
			this.height += dy;
		}
		if(r.get_right() > this.get_right()) this.set_right(r.get_right());
		if(r.get_bottom() > this.get_bottom()) this.set_bottom(r.get_bottom());
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		return new jeash.geom.Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,clone: function() {
		return new jeash.geom.Rectangle(this.x,this.y,this.width,this.height);
	}
	,set_bottomRight: function(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	,get_bottomRight: function() {
		return new jeash.geom.Point(this.x + this.width,this.y + this.height);
	}
	,set_size: function(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	,get_size: function() {
		return new jeash.geom.Point(this.width,this.height);
	}
	,set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,get_topLeft: function() {
		return new jeash.geom.Point(this.x,this.y);
	}
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,set_top: function(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	,get_top: function() {
		return this.y;
	}
	,set_right: function(r) {
		this.width = r - this.x;
		return r;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_left: function(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	,get_left: function() {
		return this.x;
	}
	,__class__: jeash.geom.Rectangle
}
jeash.geom.Transform = function(displayObject) {
	if(displayObject == null) throw "Cannot create Transform with no DisplayObject.";
	this._displayObject = displayObject;
	this._matrix = new jeash.geom.Matrix();
	this._fullMatrix = new jeash.geom.Matrix();
	this.setColorTransform(new jeash.geom.ColorTransform());
};
$hxClasses["jeash.geom.Transform"] = jeash.geom.Transform;
jeash.geom.Transform.__name__ = ["jeash","geom","Transform"];
jeash.geom.Transform.prototype = {
	getPixelBounds: function() {
		return this._displayObject.getBounds(null);
	}
	,setColorTransform: function(inValue) {
		this.colorTransform = inValue;
		return inValue;
	}
	,jeashSetFullMatrix: function(inValue) {
		this._fullMatrix.copy(inValue);
		return this._fullMatrix;
	}
	,jeashGetFullMatrix: function(localMatrix) {
		var m;
		if(localMatrix != null) m = localMatrix.mult(this._fullMatrix); else m = this._fullMatrix.clone();
		return m;
	}
	,setMatrix: function(inValue) {
		this._matrix.copy(inValue);
		this._displayObject.jeashMatrixOverridden();
		return this._matrix;
	}
	,getMatrix: function() {
		return this._matrix.clone();
	}
	,__class__: jeash.geom.Transform
}
jeash.media = {}
jeash.media.SoundChannel = function() { }
$hxClasses["jeash.media.SoundChannel"] = jeash.media.SoundChannel;
jeash.media.SoundChannel.__name__ = ["jeash","media","SoundChannel"];
jeash.media.SoundChannel.__super__ = jeash.events.EventDispatcher;
jeash.media.SoundChannel.prototype = $extend(jeash.events.EventDispatcher.prototype,{
	jeashSetSoundTransform: function(v) {
		this.jeashAudio.volume = v.volume;
		return this.soundTransform = v;
	}
	,__class__: jeash.media.SoundChannel
});
jeash.media.SoundTransform = function() { }
$hxClasses["jeash.media.SoundTransform"] = jeash.media.SoundTransform;
jeash.media.SoundTransform.__name__ = ["jeash","media","SoundTransform"];
jeash.media.SoundTransform.prototype = {
	__class__: jeash.media.SoundTransform
}
jeash.net = {}
jeash.net.URLLoader = function() { }
$hxClasses["jeash.net.URLLoader"] = jeash.net.URLLoader;
jeash.net.URLLoader.__name__ = ["jeash","net","URLLoader"];
jeash.net.URLLoader.__super__ = jeash.events.EventDispatcher;
jeash.net.URLLoader.prototype = $extend(jeash.events.EventDispatcher.prototype,{
	getData: function() {
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		switch(true) {
		case data == null:
			break;
		case js.Boot.__instanceof(data,jeash.utils.ByteArray):
			var data1 = data;
			switch( (this.dataFormat)[1] ) {
			case 0:
				uri = data1.jeashGetBuffer();
				break;
			default:
				uri = data1.readUTFBytes(data1.length);
			}
			break;
		case js.Boot.__instanceof(data,jeash.net.URLVariables):
			var data1 = data;
			var _g = 0, _g1 = Reflect.fields(data1);
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(uri.length != 0) uri += "&";
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode(Reflect.field(data1,p));
			}
			break;
		default:
			if(data != null) uri = data.toString();
		}
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open(method,url + (question?"?":"&") + Std.string(uri),true);
				uri = "";
			} else xmlHttpRequest.open(method,url,true);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		switch( (this.dataFormat)[1] ) {
		case 0:
			xmlHttpRequest.responseType = "arraybuffer";
			break;
		default:
		}
		var _g = 0;
		while(_g < requestHeaders.length) {
			var header = requestHeaders[_g];
			++_g;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		// If you receive "DOMException: NETWORK_ERR", you most likely are testing;
		// locally, and AJAX calls are not allowed in your browser for security;
		xmlHttpRequest.send(uri);
		this.onOpen();
		this.getData = function() {
			return xmlHttpRequest.response;
		};
	}
	,registerEvents: function(subject) {
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",$bind(this,this.onProgress),false);
		subject.onreadystatechange = function() {
			if(subject.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = subject.status;
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(s == undefined) s = null;
			if(s != null) self.onStatus(s);
			if(s != null && s >= 200 && s < 400) self.onData(subject.response); else switch(s) {
			case null: case undefined:
				self.onError("Failed to connect or resolve host");
				break;
			case 12029:
				self.onError("Failed to connect to host");
				break;
			case 12007:
				self.onError("Unknown host");
				break;
			default:
				self.onError("Http Error #" + subject.status);
			}
		};
	}
	,onProgress: function(event) {
		var evt = new jeash.events.ProgressEvent(jeash.events.ProgressEvent.PROGRESS);
		evt.currentTarget = this;
		evt.bytesLoaded = event.loaded;
		evt.bytesTotal = event.total;
		this.dispatchEvent(evt);
	}
	,onStatus: function(status) {
		var evt = new jeash.events.HTTPStatusEvent(jeash.events.HTTPStatusEvent.HTTP_STATUS,false,false,status);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onOpen: function() {
		var evt = new jeash.events.Event(jeash.events.Event.OPEN);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onError: function(msg) {
		var evt = new jeash.events.IOErrorEvent(jeash.events.IOErrorEvent.IO_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onData: function(_) {
		var content = this.getData();
		if(js.Boot.__instanceof(content,String)) this.data = Std.string(content); else if(js.Boot.__instanceof(content,jeash.utils.ByteArray)) this.data = jeash.utils.ByteArray.jeashOfBuffer(content); else {
			switch( (this.dataFormat)[1] ) {
			case 0:
				this.data = jeash.utils.ByteArray.jeashOfBuffer(content);
				break;
			default:
				var bytes = jeash.utils.ByteArray.jeashOfBuffer(content);
				if(bytes != null && bytes.length > 0) this.data = Std.string(bytes.readUTFBytes(bytes.length)); else this.data = Std.string(content);
			}
		}
		var evt = new jeash.events.Event(jeash.events.Event.COMPLETE);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,load: function(request) {
		if(request.contentType == null) {
			switch( (this.dataFormat)[1] ) {
			case 0:
				request.requestHeaders.push(new jeash.net.URLRequestHeader("Content-Type","application/octet-stream"));
				break;
			default:
				request.requestHeaders.push(new jeash.net.URLRequestHeader("Content-Type","application/x-www-form-urlencoded"));
			}
		} else request.requestHeaders.push(new jeash.net.URLRequestHeader("Content-Type",request.contentType));
		this.requestUrl(request.url,request.method,request.data,request.requestHeaders);
	}
	,__class__: jeash.net.URLLoader
});
jeash.net.URLLoaderDataFormat = $hxClasses["jeash.net.URLLoaderDataFormat"] = { __ename__ : true, __constructs__ : ["BINARY","TEXT","VARIABLES"] }
jeash.net.URLLoaderDataFormat.BINARY = ["BINARY",0];
jeash.net.URLLoaderDataFormat.BINARY.toString = $estr;
jeash.net.URLLoaderDataFormat.BINARY.__enum__ = jeash.net.URLLoaderDataFormat;
jeash.net.URLLoaderDataFormat.TEXT = ["TEXT",1];
jeash.net.URLLoaderDataFormat.TEXT.toString = $estr;
jeash.net.URLLoaderDataFormat.TEXT.__enum__ = jeash.net.URLLoaderDataFormat;
jeash.net.URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
jeash.net.URLLoaderDataFormat.VARIABLES.toString = $estr;
jeash.net.URLLoaderDataFormat.VARIABLES.__enum__ = jeash.net.URLLoaderDataFormat;
jeash.net.URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = jeash.net.URLRequestMethod.GET;
	this.contentType = "application/x-www-form-urlencoded";
};
$hxClasses["jeash.net.URLRequest"] = jeash.net.URLRequest;
jeash.net.URLRequest.__name__ = ["jeash","net","URLRequest"];
jeash.net.URLRequest.prototype = {
	__class__: jeash.net.URLRequest
}
jeash.net.URLRequestHeader = function(name,value) {
	this.name = name;
	this.value = value;
};
$hxClasses["jeash.net.URLRequestHeader"] = jeash.net.URLRequestHeader;
jeash.net.URLRequestHeader.__name__ = ["jeash","net","URLRequestHeader"];
jeash.net.URLRequestHeader.prototype = {
	__class__: jeash.net.URLRequestHeader
}
jeash.net.URLRequestMethod = function() { }
$hxClasses["jeash.net.URLRequestMethod"] = jeash.net.URLRequestMethod;
jeash.net.URLRequestMethod.__name__ = ["jeash","net","URLRequestMethod"];
jeash.net.URLVariables = function(inEncoded) {
	if(inEncoded != null) this.decode(inEncoded);
};
$hxClasses["jeash.net.URLVariables"] = jeash.net.URLVariables;
jeash.net.URLVariables.__name__ = ["jeash","net","URLVariables"];
jeash.net.URLVariables.prototype = {
	decode: function(inVars) {
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			Reflect.deleteField(this,f);
		}
		var fields1 = inVars.split(";").join("&").split("&");
		var _g = 0;
		while(_g < fields1.length) {
			var f = fields1[_g];
			++_g;
			var eq = f.indexOf("=");
			if(eq > 0) this[StringTools.urlDecode(HxOverrides.substr(f,0,eq))] = StringTools.urlDecode(HxOverrides.substr(f,eq + 1,null)); else if(eq != 0) this[StringTools.urlDecode(f)] = "";
		}
	}
	,__class__: jeash.net.URLVariables
}
jeash.text = {}
jeash.text.Font = function() {
	this.jeashMetrics = [];
	this.jeashFontScale = 9.0;
	var className = Type.getClassName(Type.getClass(this));
	if(jeash.text.Font.jeashFontData == null) {
		jeash.text.Font.jeashFontData = [];
		jeash.text.Font.jeashFontData["Bitstream_Vera_Sans"] = jeash.text.Font.DEFAULT_FONT_DATA;
	}
	this.jeashSetFontName(className == "jeash.text.Font"?"Bitstream_Vera_Sans":className.split(".").pop());
};
$hxClasses["jeash.text.Font"] = jeash.text.Font;
jeash.text.Font.__name__ = ["jeash","text","Font"];
jeash.text.Font.jeashOfResource = function(name) {
	var data = haxe.Resource.getString(name);
	if(data == null) console.log("Resource data for string '" + name + "' not found."); else jeash.text.Font.jeashFontData[name] = data;
}
jeash.text.Font.prototype = {
	jeashSetFontName: function(name) {
		if(name == "_sans" || name == "_serif" || name == "_typewriter") name = "Bitstream_Vera_Sans";
		this.fontName = name;
		if(jeash.text.Font.jeashFontData[this.fontName] == null) try {
			jeash.text.Font.jeashOfResource(name);
		} catch( e ) {
			nme.Lib.trace("Glyph data for font '" + name + "' does not exist, defaulting to '" + "Bitstream_Vera_Sans" + "'.");
			this.fontName = "Bitstream_Vera_Sans";
		} else try {
			this.jeashGlyphData = haxe.Unserializer.run(jeash.text.Font.jeashFontData[this.fontName]);
		} catch( e ) {
			nme.Lib.trace("Error decoding font '" + name + "', defaulting to '" + "Bitstream_Vera_Sans" + "'.");
			this.fontName = "Bitstream_Vera_Sans";
		}
		return name;
	}
	,__class__: jeash.text.Font
}
jeash.ui = {}
jeash.ui.Keyboard = function() { }
$hxClasses["jeash.ui.Keyboard"] = jeash.ui.Keyboard;
jeash.ui.Keyboard.__name__ = ["jeash","ui","Keyboard"];
jeash.ui.Keyboard.jeashConvertWebkitCode = function(code) {
	switch(code.toLowerCase()) {
	case "backspace":
		return jeash.ui.Keyboard.BACKSPACE;
	case "tab":
		return jeash.ui.Keyboard.TAB;
	case "enter":
		return jeash.ui.Keyboard.ENTER;
	case "shift":
		return jeash.ui.Keyboard.SHIFT;
	case "control":
		return jeash.ui.Keyboard.CONTROL;
	case "capslock":
		return jeash.ui.Keyboard.CAPS_LOCK;
	case "escape":
		return jeash.ui.Keyboard.ESCAPE;
	case "space":
		return jeash.ui.Keyboard.SPACE;
	case "pageup":
		return jeash.ui.Keyboard.PAGE_UP;
	case "pagedown":
		return jeash.ui.Keyboard.PAGE_DOWN;
	case "end":
		return jeash.ui.Keyboard.END;
	case "home":
		return jeash.ui.Keyboard.HOME;
	case "left":
		return jeash.ui.Keyboard.LEFT;
	case "right":
		return jeash.ui.Keyboard.RIGHT;
	case "up":
		return jeash.ui.Keyboard.UP;
	case "down":
		return jeash.ui.Keyboard.DOWN;
	case "insert":
		return jeash.ui.Keyboard.INSERT;
	case "delete":
		return jeash.ui.Keyboard.DELETE;
	case "numlock":
		return jeash.ui.Keyboard.NUMLOCK;
	case "break":
		return jeash.ui.Keyboard.BREAK;
	}
	if(code.indexOf("U+") == 0) return Std.parseInt("0x" + HxOverrides.substr(code,3,null));
	throw "Unrecognised key code: " + code;
	return 0;
}
jeash.ui.Keyboard.jeashConvertMozillaCode = function(code) {
	switch(code) {
	case jeash.ui.Keyboard.DOM_VK_BACK_SPACE:
		return jeash.ui.Keyboard.BACKSPACE;
	case jeash.ui.Keyboard.DOM_VK_TAB:
		return jeash.ui.Keyboard.TAB;
	case jeash.ui.Keyboard.DOM_VK_RETURN:
		return jeash.ui.Keyboard.ENTER;
	case jeash.ui.Keyboard.DOM_VK_ENTER:
		return jeash.ui.Keyboard.ENTER;
	case jeash.ui.Keyboard.DOM_VK_SHIFT:
		return jeash.ui.Keyboard.SHIFT;
	case jeash.ui.Keyboard.DOM_VK_CONTROL:
		return jeash.ui.Keyboard.CONTROL;
	case jeash.ui.Keyboard.DOM_VK_CAPS_LOCK:
		return jeash.ui.Keyboard.CAPS_LOCK;
	case jeash.ui.Keyboard.DOM_VK_ESCAPE:
		return jeash.ui.Keyboard.ESCAPE;
	case jeash.ui.Keyboard.DOM_VK_SPACE:
		return jeash.ui.Keyboard.SPACE;
	case jeash.ui.Keyboard.DOM_VK_PAGE_UP:
		return jeash.ui.Keyboard.PAGE_UP;
	case jeash.ui.Keyboard.DOM_VK_PAGE_DOWN:
		return jeash.ui.Keyboard.PAGE_DOWN;
	case jeash.ui.Keyboard.DOM_VK_END:
		return jeash.ui.Keyboard.END;
	case jeash.ui.Keyboard.DOM_VK_HOME:
		return jeash.ui.Keyboard.HOME;
	case jeash.ui.Keyboard.DOM_VK_LEFT:
		return jeash.ui.Keyboard.LEFT;
	case jeash.ui.Keyboard.DOM_VK_RIGHT:
		return jeash.ui.Keyboard.RIGHT;
	case jeash.ui.Keyboard.DOM_VK_UP:
		return jeash.ui.Keyboard.UP;
	case jeash.ui.Keyboard.DOM_VK_DOWN:
		return jeash.ui.Keyboard.DOWN;
	case jeash.ui.Keyboard.DOM_VK_INSERT:
		return jeash.ui.Keyboard.INSERT;
	case jeash.ui.Keyboard.DOM_VK_DELETE:
		return jeash.ui.Keyboard.DELETE;
	case jeash.ui.Keyboard.DOM_VK_NUM_LOCK:
		return jeash.ui.Keyboard.NUMLOCK;
	default:
		return code;
	}
}
jeash.utils = {}
jeash.utils.ByteArray = function() {
	this.position = 0;
	this.byteView = new Uint8Array(0);
	this.data = new DataView(this.byteView);
	this.set_length(0);
	this.littleEndian = false;
};
$hxClasses["jeash.utils.ByteArray"] = jeash.utils.ByteArray;
jeash.utils.ByteArray.__name__ = ["jeash","utils","ByteArray"];
jeash.utils.ByteArray.jeashOfBuffer = function(buffer) {
	var bytes = new jeash.utils.ByteArray();
	bytes.set_length(buffer.byteLength);
	bytes.data = new DataView(buffer);
	bytes.byteView = new Uint8Array(buffer);
	return bytes;
}
jeash.utils.ByteArray.prototype = {
	jeashGetBuffer: function() {
		return this.data.buffer;
	}
	,jeashSetEndian: function(endian) {
		this.littleEndian = endian == "littleEndian";
		return endian;
	}
	,jeashGetEndian: function() {
		return this.littleEndian == true?"littleEndian":"bigEndian";
	}
	,readUTFBytes: function(len) {
		var value = "";
		var fcc = String.fromCharCode;
		var max = this.position + len;
		while(this.position < max) {
			var c = this.data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				value += fcc(c);
			} else if(c < 224) value += fcc((c & 63) << 6 | this.data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = this.data.getUint8(this.position++);
				value += fcc((c & 31) << 12 | (c2 & 127) << 6 | this.data.getUint8(this.position++) & 127);
			} else {
				var c2 = this.data.getUint8(this.position++);
				var c3 = this.data.getUint8(this.position++);
				value += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | this.data.getUint8(this.position++) & 127);
			}
		}
		return value;
	}
	,jeashGetBytesAvailable: function() {
		return this.length - this.position;
	}
	,set_length: function(len) {
		if(len > this.length) {
			var oldByteView = this.byteView;
			var newByteView = new Uint8Array(len);
			if(oldByteView != null) newByteView.set(oldByteView);
			this.byteView = newByteView;
			this.data = new DataView(newByteView.buffer);
		} else if(len < this.length) {
			this.byteView = this.byteView.subarray(0,len);
			this.data = new DataView(newByteView.buffer);
		}
		return this.length = len;
	}
	,__class__: jeash.utils.ByteArray
}
jeash.utils.Endian = function() { }
$hxClasses["jeash.utils.Endian"] = jeash.utils.Endian;
jeash.utils.Endian.__name__ = ["jeash","utils","Endian"];
jeash.utils.Uuid = function() { }
$hxClasses["jeash.utils.Uuid"] = jeash.utils.Uuid;
jeash.utils.Uuid.__name__ = ["jeash","utils","Uuid"];
jeash.utils.Uuid.random = function(size) {
	if(size == null) size = 32;
	var nchars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".length;
	var uid = new StringBuf();
	var _g = 0;
	while(_g < size) {
		var i = _g++;
		uid.b += Std.string("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.random() * nchars | 0));
	}
	return uid.b;
}
jeash.utils.Uuid.uuid = function() {
	return jeash.utils.Uuid.random(8) + "-" + jeash.utils.Uuid.random(4) + "-" + jeash.utils.Uuid.random(4) + "-" + jeash.utils.Uuid.random(4) + "-" + jeash.utils.Uuid.random(12);
}
var js = {}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Lib = function() { }
$hxClasses["js.Lib"] = js.Lib;
js.Lib.__name__ = ["js","Lib"];
var nme = {}
nme.Lib = function() { }
$hxClasses["nme.Lib"] = nme.Lib;
nme.Lib.__name__ = ["nme","Lib"];
nme.Lib.trace = function(arg) {
	jeash.Lib.trace(arg);
}
nme.Lib.nmeGetCompany = function() {
	return "";
}
nme.Lib.nmeGetCurrent = function() {
	return jeash.Lib.jeashGetCurrent();
}
nme.Lib.nmeGetFile = function() {
	return "";
}
nme.Lib.nmeGetInitHeight = function() {
	return 0;
}
nme.Lib.nmeGetInitWidth = function() {
	return 0;
}
nme.Lib.nmeGetPackageName = function() {
	return "";
}
nme.Lib.nmeGetStage = function() {
	return nme.Lib.nmeGetCurrent().getStage();
}
nme.Lib.nmeGetVersion = function() {
	return "";
}
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
}; else null;
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.Prolog = "prolog";
Xml.Document = "document";
haxe.Resource.content = [];
if(typeof document != "undefined") js.Lib.document = document;
if(typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}
js.XMLHttpRequest = window.XMLHttpRequest?XMLHttpRequest:window.ActiveXObject?function() {
	try {
		return new ActiveXObject("Msxml2.XMLHTTP");
	} catch( e ) {
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch( e1 ) {
			throw "Unable to create XMLHttpRequest object.";
		}
	}
}:(function($this) {
	var $r;
	throw "Unable to create XMLHttpRequest object.";
	return $r;
}(this));
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
jeash.Lib.HTML_DIV_EVENT_TYPES = ["resize","mouseup","mouseover","mouseout","mousemove","mousedown","mousewheel","dblclick","click"];
jeash.Lib.HTML_WINDOW_EVENT_TYPES = ["keyup","keypress","keydown","resize"];
jeash.Lib.HTML_TOUCH_EVENT_TYPES = ["touchstart","touchmove","touchend"];
jeash.events.Event.ACTIVATE = "activate";
jeash.events.Event.ADDED = "added";
jeash.events.Event.ADDED_TO_STAGE = "addedToStage";
jeash.events.Event.COMPLETE = "complete";
jeash.events.Event.ENTER_FRAME = "enterFrame";
jeash.events.Event.OPEN = "open";
jeash.events.Event.REMOVED = "removed";
jeash.events.Event.REMOVED_FROM_STAGE = "removedFromStage";
jeash.events.Event.RENDER = "render";
jeash.events.Event.RESIZE = "resize";
jeash.events.MouseEvent.CLICK = "click";
jeash.events.MouseEvent.DOUBLE_CLICK = "doubleClick";
jeash.events.MouseEvent.MOUSE_DOWN = "mouseDown";
jeash.events.MouseEvent.MOUSE_MOVE = "mouseMove";
jeash.events.MouseEvent.MOUSE_OUT = "mouseOut";
jeash.events.MouseEvent.MOUSE_OVER = "mouseOver";
jeash.events.MouseEvent.MOUSE_UP = "mouseUp";
jeash.events.MouseEvent.MOUSE_WHEEL = "mouseWheel";
jeash.events.MouseEvent.ROLL_OUT = "rollOut";
jeash.events.MouseEvent.ROLL_OVER = "rollOver";
jeash.events.TouchEvent.TOUCH_BEGIN = "touchBegin";
jeash.events.TouchEvent.TOUCH_END = "touchEnd";
jeash.events.TouchEvent.TOUCH_MOVE = "touchMove";
jeash.events.TouchEvent.TOUCH_OUT = "touchOut";
jeash.events.TouchEvent.TOUCH_OVER = "touchOver";
jeash.events.TouchEvent.TOUCH_ROLL_OUT = "touchRollOut";
jeash.events.TouchEvent.TOUCH_ROLL_OVER = "touchRollOver";
jeash.display.Stage.jeashAcceleration = { x : 0.0, y : 1.0, z : 0.0};
jeash.display.Stage.jeashMouseChanges = [jeash.events.MouseEvent.MOUSE_OUT,jeash.events.MouseEvent.MOUSE_OVER,jeash.events.MouseEvent.ROLL_OUT,jeash.events.MouseEvent.ROLL_OVER];
jeash.display.Stage.jeashTouchChanges = [jeash.events.TouchEvent.TOUCH_OUT,jeash.events.TouchEvent.TOUCH_OVER,jeash.events.TouchEvent.TOUCH_ROLL_OUT,jeash.events.TouchEvent.TOUCH_ROLL_OVER];
jeash.display.StageQuality.BEST = "best";
jeash.events.Listener.sIDs = 1;
jeash.events.EventPhase.CAPTURING_PHASE = 0;
jeash.events.EventPhase.AT_TARGET = 1;
jeash.events.EventPhase.BUBBLING_PHASE = 2;
jeash.events.FocusEvent.FOCUS_IN = "FOCUS_IN";
jeash.events.FocusEvent.FOCUS_OUT = "FOCUS_OUT";
jeash.events.HTTPStatusEvent.HTTP_STATUS = "httpStatus";
jeash.events.IOErrorEvent.IO_ERROR = "IO_ERROR";
jeash.events.KeyboardEvent.KEY_DOWN = "KEY_DOWN";
jeash.events.KeyboardEvent.KEY_UP = "KEY_UP";
jeash.events.ProgressEvent.PROGRESS = "progress";
jeash.net.URLRequestMethod.GET = "GET";
jeash.text.Font.DEFAULT_FONT_DATA = "q:55oy6:ascentd950.5y4:dataad84d277.5d564d277.5d564d320.5d293d1024d187.5d1024d442.5d362.5d84d362.5d84d277.5hy6:_widthd651.5y4:xMaxd564y4:xMind84y4:yMaxd746.5y4:yMind0y7:_heightd662.5y7:leadingd168y7:descentd241.5y8:charCodei55y15:leftsideBearingd84y12:advanceWidthd651.5y8:commandsai1i2i2i2i2i2i2i2hg:111oR0d950.5R1ad313.5d528.5d239.5d528.5d196.5d586.25d153.5d644d153.5d744.5d153.5d845d196.25d902.75d239d960.5d313.5d960.5d387d960.5d430d902.5d473d844.5d473d744.5d473d645d430d586.75d387d528.5d313.5d528.5d313.5d450.5d433.5d450.5d502d528.5d570.5d606.5d570.5d744.5d570.5d882d502d960.25d433.5d1038.5d313.5d1038.5d193d1038.5d124.75d960.25d56.5d882d56.5d744.5d56.5d606.5d124.75d528.5d193d450.5d313.5d450.5hR2d626.5R3d570.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i111R11d56.5R12d626.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:54oR0d950.5R1ad338d610.5d270d610.5d230.25d657d190.5d703.5d190.5d784.5d190.5d865d230.25d911.75d270d958.5d338d958.5d406d958.5d445.75d911.75d485.5d865d485.5d784.5d485.5d703.5d445.75d657d406d610.5d338d610.5d538.5d294d538.5d386d500.5d368d461.75d358.5d423d349d385d349d285d349d232.25d416.5d179.5d484d172d620.5d201.5d577d246d553.75d290.5d530.5d344d530.5d456.5d530.5d521.75d598.75d587d667d587d784.5d587d899.5d519d969d451d1038.5d338d1038.5d208.5d1038.5d140d939.25d71.5d840d71.5d651.5d71.5d474.5d155.5d369.25d239.5d264d381d264d419d264d457.75d271.5d496.5d279d538.5d294hR2d651.5R3d587R4d71.5R5d760R6d-14.5R7d688.5R8d168R9d241.5R10i54R11d71.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3hg:110oR0d950.5R1ad562d686d562d1024d470d1024d470d689d470d609.5d439d570d408d530.5d346d530.5d271.5d530.5d228.5d578d185.5d625.5d185.5d707.5d185.5d1024d93d1024d93d464d185.5d464d185.5d551d218.5d500.5d263.25d475.5d308d450.5d366.5d450.5d463d450.5d512.5d510.25d562d570d562d686hR2d649R3d562R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i110R11d93R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:53oR0d950.5R1ad110.5d277.5d507d277.5d507d362.5d203d362.5d203d545.5d225d538d247d534.25d269d530.5d291d530.5d416d530.5d489d599d562d667.5d562d784.5d562d905d487d971.75d412d1038.5d275.5d1038.5d228.5d1038.5d179.75d1030.5d131d1022.5d79d1006.5d79d905d124d929.5d172d941.5d220d953.5d273.5d953.5d360d953.5d410.5d908d461d862.5d461d784.5d461d706.5d410.5d661d360d615.5d273.5d615.5d233d615.5d192.75d624.5d152.5d633.5d110.5d652.5d110.5d277.5hR2d651.5R3d562R4d79R5d746.5R6d-14.5R7d667.5R8d168R9d241.5R10i53R11d79R12d651.5R13ai1i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3i2hg:109oR0d950.5R1ad532.5d571.5d567d509.5d615d480d663d450.5d728d450.5d815.5d450.5d863d511.75d910.5d573d910.5d686d910.5d1024d818d1024d818d689d818d608.5d789.5d569.5d761d530.5d702.5d530.5d631d530.5d589.5d578d548d625.5d548d707.5d548d1024d455.5d1024d455.5d689d455.5d608d427d569.25d398.5d530.5d339d530.5d268.5d530.5d227d578.25d185.5d626d185.5d707.5d185.5d1024d93d1024d93d464d185.5d464d185.5d551d217d499.5d261d475d305d450.5d365.5d450.5d426.5d450.5d469.25d481.5d512d512.5d532.5d571.5hR2d997.5R3d910.5R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i109R11d93R12d997.5R13ai1i3i3i3i3i2i2i2i3i3i3i3i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:52oR0d950.5R1ad387d365.5d132d764d387d764d387d365.5d360.5d277.5d487.5d277.5d487.5d764d594d764d594d848d487.5d848d487.5d1024d387d1024d387d848d50d848d50d750.5d360.5d277.5hR2d651.5R3d594R4d50R5d746.5R6d0R7d696.5R8d168R9d241.5R10i52R11d50R12d651.5R13ai1i2i2i2i1i2i2i2i2i2i2i2i2i2i2i2hg:108oR0d950.5R1ad96.5d246d188.5d246d188.5d1024d96.5d1024d96.5d246hR2d284.5R3d188.5R4d96.5R5d778R6d0R7d681.5R8d168R9d241.5R10i108R11d96.5R12d284.5R13ai1i2i2i2i2hg:51oR0d950.5R1ad415.5d621.5d488d637d528.75d686d569.5d735d569.5d807d569.5d917.5d493.5d978d417.5d1038.5d277.5d1038.5d230.5d1038.5d180.75d1029.25d131d1020d78d1001.5d78d904d120d928.5d170d941d220d953.5d274.5d953.5d369.5d953.5d419.25d916d469d878.5d469d807d469d741d422.75d703.75d376.5d666.5d294d666.5d207d666.5d207d583.5d298d583.5d372.5d583.5d412d553.75d451.5d524d451.5d468d451.5d410.5d410.75d379.75d370d349d294d349d252.5d349d205d358d157.5d367d100.5d386d100.5d296d158d280d208.25d272d258.5d264d303d264d418d264d485d316.25d552d368.5d552d457.5d552d519.5d516.5d562.25d481d605d415.5d621.5hR2d651.5R3d569.5R4d78R5d760R6d-14.5R7d682R8d168R9d241.5R10i51R11d78R12d651.5R13ai1i3i3i3i3i3i3i2i3i3i3i3i3i3i2i2i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:107oR0d950.5R1ad93d246d185.5d246d185.5d705.5d460d464d577.5d464d280.5d726d590d1024d470d1024d185.5d750.5d185.5d1024d93d1024d93d246hR2d593R3d590R4d93R5d778R6d0R7d685R8d168R9d241.5R10i107R11d93R12d593R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:50oR0d950.5R1ad196.5d939d549d939d549d1024d75d1024d75d939d132.5d879.5d231.75d779.25d331d679d356.5d650d405d595.5d424.25d557.75d443.5d520d443.5d483.5d443.5d424d401.75d386.5d360d349d293d349d245.5d349d192.75d365.5d140d382d80d415.5d80d313.5d141d289d194d276.5d247d264d291d264d407d264d476d322d545d380d545d477d545d523d527.75d564.25d510.5d605.5d465d661.5d452.5d676d385.5d745.25d318.5d814.5d196.5d939hR2d651.5R3d549R4d75R5d760R6d0R7d685R8d168R9d241.5R10i50R11d75R12d651.5R13ai1i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:106oR0d950.5R1ad96.5d464d188.5d464d188.5d1034d188.5d1141d147.75d1189d107d1237d16.5d1237d-18.5d1237d-18.5d1159d6d1159d58.5d1159d77.5d1134.75d96.5d1110.5d96.5d1034d96.5d464d96.5d246d188.5d246d188.5d362.5d96.5d362.5d96.5d246hR2d284.5R3d188.5R4d-18.5R5d778R6d-213R7d796.5R8d168R9d241.5R10i106R11d-18.5R12d284.5R13ai1i2i2i3i3i2i2i2i3i3i2i1i2i2i2i2hg:49oR0d950.5R1ad127d939d292d939d292d369.5d112.5d405.5d112.5d313.5d291d277.5d392d277.5d392d939d557d939d557d1024d127d1024d127d939hR2d651.5R3d557R4d112.5R5d746.5R6d0R7d634R8d168R9d241.5R10i49R11d112.5R12d651.5R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:105oR0d950.5R1ad96.5d464d188.5d464d188.5d1024d96.5d1024d96.5d464d96.5d246d188.5d246d188.5d362.5d96.5d362.5d96.5d246hR2d284.5R3d188.5R4d96.5R5d778R6d0R7d681.5R8d168R9d241.5R10i105R11d96.5R12d284.5R13ai1i2i2i2i2i1i2i2i2i2hg:48oR0d950.5R1ad325.5d344d247.5d344d208.25d420.75d169d497.5d169d651.5d169d805d208.25d881.75d247.5d958.5d325.5d958.5d404d958.5d443.25d881.75d482.5d805d482.5d651.5d482.5d497.5d443.25d420.75d404d344d325.5d344d325.5d264d451d264d517.25d363.25d583.5d462.5d583.5d651.5d583.5d840d517.25d939.25d451d1038.5d325.5d1038.5d200d1038.5d133.75d939.25d67.5d840d67.5d651.5d67.5d462.5d133.75d363.25d200d264d325.5d264hR2d651.5R3d583.5R4d67.5R5d760R6d-14.5R7d692.5R8d168R9d241.5R10i48R11d67.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:104oR0d950.5R1ad562d686d562d1024d470d1024d470d689d470d609.5d439d570d408d530.5d346d530.5d271.5d530.5d228.5d578d185.5d625.5d185.5d707.5d185.5d1024d93d1024d93d246d185.5d246d185.5d551d218.5d500.5d263.25d475.5d308d450.5d366.5d450.5d463d450.5d512.5d510.25d562d570d562d686hR2d649R3d562R4d93R5d778R6d0R7d685R8d168R9d241.5R10i104R11d93R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:47oR0d950.5R1ad260d277.5d345d277.5d85d1119d0d1119d260d277.5hR2d345R3d345R4d0R5d746.5R6d-95R7d746.5R8d168R9d241.5R10i47R11d0R12d345R13ai1i2i2i2i2hg:103oR0d950.5R1ad465d737.5d465d637.5d423.75d582.5d382.5d527.5d308d527.5d234d527.5d192.75d582.5d151.5d637.5d151.5d737.5d151.5d837d192.75d892d234d947d308d947d382.5d947d423.75d892d465d837d465d737.5d557d954.5d557d1097.5d493.5d1167.25d430d1237d299d1237d250.5d1237d207.5d1229.75d164.5d1222.5d124d1207.5d124d1118d164.5d1140d204d1150.5d243.5d1161d284.5d1161d375d1161d420d1113.75d465d1066.5d465d971d465d925.5d436.5d975d392d999.5d347.5d1024d285.5d1024d182.5d1024d119.5d945.5d56.5d867d56.5d737.5d56.5d607.5d119.5d529d182.5d450.5d285.5d450.5d347.5d450.5d392d475d436.5d499.5d465d549d465d464d557d464d557d954.5hR2d650R3d557R4d56.5R5d573.5R6d-213R7d517R8d168R9d241.5R10i103R11d56.5R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i2i3i3i3i3i2i3i3i3i3i3i3i3i3i2i2i2hg:46oR0d950.5R1ad109.5d897d215d897d215d1024d109.5d1024d109.5d897hR2d325.5R3d215R4d109.5R5d127R6d0R7d17.5R8d168R9d241.5R10i46R11d109.5R12d325.5R13ai1i2i2i2i2hg:102oR0d950.5R1ad380d246d380d322.5d292d322.5d242.5d322.5d223.25d342.5d204d362.5d204d414.5d204d464d355.5d464d355.5d535.5d204d535.5d204d1024d111.5d1024d111.5d535.5d23.5d535.5d23.5d464d111.5d464d111.5d425d111.5d331.5d155d288.75d198.5d246d293d246d380d246hR2d360.5R3d380R4d23.5R5d778R6d0R7d754.5R8d168R9d241.5R10i102R11d23.5R12d360.5R13ai1i2i2i3i3i2i2i2i2i2i2i2i2i2i2i2i3i3i2hg:45oR0d950.5R1ad50d702.5d319.5d702.5d319.5d784.5d50d784.5d50d702.5hR2d369.5R3d319.5R4d50R5d321.5R6d239.5R7d271.5R8d168R9d241.5R10i45R11d50R12d369.5R13ai1i2i2i2i2hg:101oR0d950.5R1ad575.5d721d575.5d766d152.5d766d158.5d861d209.75d910.75d261d960.5d352.5d960.5d405.5d960.5d455.25d947.5d505d934.5d554d908.5d554d995.5d504.5d1016.5d452.5d1027.5d400.5d1038.5d347d1038.5d213d1038.5d134.75d960.5d56.5d882.5d56.5d749.5d56.5d612d130.75d531.25d205d450.5d331d450.5d444d450.5d509.75d523.25d575.5d596d575.5d721d483.5d694d482.5d618.5d441.25d573.5d400d528.5d332d528.5d255d528.5d208.75d572d162.5d615.5d155.5d694.5d483.5d694hR2d630R3d575.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i101R11d56.5R12d630R13ai1i2i2i3i3i3i3i2i3i3i3i3i3i3i3i3i1i3i3i3i3i2hg:44oR0d950.5R1ad120d897d225.5d897d225.5d983d143.5d1143d79d1143d120d983d120d897hR2d325.5R3d225.5R4d79R5d127R6d-119R7d48R8d168R9d241.5R10i44R11d79R12d325.5R13ai1i2i2i2i2i2i2hg:100oR0d950.5R1ad465d549d465d246d557d246d557d1024d465d1024d465d940d436d990d391.75d1014.25d347.5d1038.5d285.5d1038.5d184d1038.5d120.25d957.5d56.5d876.5d56.5d744.5d56.5d612.5d120.25d531.5d184d450.5d285.5d450.5d347.5d450.5d391.75d474.75d436d499d465d549d151.5d744.5d151.5d846d193.25d903.75d235d961.5d308d961.5d381d961.5d423d903.75d465d846d465d744.5d465d643d423d585.25d381d527.5d308d527.5d235d527.5d193.25d585.25d151.5d643d151.5d744.5hR2d650R3d557R4d56.5R5d778R6d-14.5R7d721.5R8d168R9d241.5R10i100R11d56.5R12d650R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:43oR0d950.5R1ad471d382d471d660.5d749.5d660.5d749.5d745.5d471d745.5d471d1024d387d1024d387d745.5d108.5d745.5d108.5d660.5d387d660.5d387d382d471d382hR2d858R3d749.5R4d108.5R5d642R6d0R7d533.5R8d168R9d241.5R10i43R11d108.5R12d858R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:99oR0d950.5R1ad499.5d485.5d499.5d571.5d460.5d550d421.25d539.25d382d528.5d342d528.5d252.5d528.5d203d585.25d153.5d642d153.5d744.5d153.5d847d203d903.75d252.5d960.5d342d960.5d382d960.5d421.25d949.75d460.5d939d499.5d917.5d499.5d1002.5d461d1020.5d419.75d1029.5d378.5d1038.5d332d1038.5d205.5d1038.5d131d959d56.5d879.5d56.5d744.5d56.5d607.5d131.75d529d207d450.5d338d450.5d380.5d450.5d421d459.25d461.5d468d499.5d485.5hR2d563R3d499.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i99R11d56.5R12d563R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:42oR0d950.5R1ad481.5d400.5d302d497.5d481.5d595d452.5d644d284.5d542.5d284.5d731d227.5d731d227.5d542.5d59.5d644d30.5d595d210d497.5d30.5d400.5d59.5d351d227.5d452.5d227.5d264d284.5d264d284.5d452.5d452.5d351d481.5d400.5hR2d512R3d481.5R4d30.5R5d760R6d293R7d729.5R8d168R9d241.5R10i42R11d30.5R12d512R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2hg:98oR0d950.5R1ad498.5d744.5d498.5d643d456.75d585.25d415d527.5d342d527.5d269d527.5d227.25d585.25d185.5d643d185.5d744.5d185.5d846d227.25d903.75d269d961.5d342d961.5d415d961.5d456.75d903.75d498.5d846d498.5d744.5d185.5d549d214.5d499d258.75d474.75d303d450.5d364.5d450.5d466.5d450.5d530.25d531.5d594d612.5d594d744.5d594d876.5d530.25d957.5d466.5d1038.5d364.5d1038.5d303d1038.5d258.75d1014.25d214.5d990d185.5d940d185.5d1024d93d1024d93d246d185.5d246d185.5d549hR2d650R3d594R4d93R5d778R6d-14.5R7d685R8d168R9d241.5R10i98R11d93R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i2i2hg:41oR0d950.5R1ad82d247d162d247d237d365d274.25d478d311.5d591d311.5d702.5d311.5d814.5d274.25d928d237d1041.5d162d1159d82d1159d148.5d1044.5d181.25d931.25d214d818d214d702.5d214d587d181.25d474.5d148.5d362d82d247hR2d399.5R3d311.5R4d82R5d777R6d-135R7d695R8d168R9d241.5R10i41R11d82R12d399.5R13ai1i2i3i3i3i3i2i3i3i3i3hg:97oR0d950.5R1ad351d742.5d239.5d742.5d196.5d768d153.5d793.5d153.5d855d153.5d904d185.75d932.75d218d961.5d273.5d961.5d350d961.5d396.25d907.25d442.5d853d442.5d763d442.5d742.5d351d742.5d534.5d704.5d534.5d1024d442.5d1024d442.5d939d411d990d364d1014.25d317d1038.5d249d1038.5d163d1038.5d112.25d990.25d61.5d942d61.5d861d61.5d766.5d124.75d718.5d188d670.5d313.5d670.5d442.5d670.5d442.5d661.5d442.5d598d400.75d563.25d359d528.5d283.5d528.5d235.5d528.5d190d540d144.5d551.5d102.5d574.5d102.5d489.5d153d470d200.5d460.25d248d450.5d293d450.5d414.5d450.5d474.5d513.5d534.5d576.5d534.5d704.5hR2d627.5R3d534.5R4d61.5R5d573.5R6d-14.5R7d512R8d168R9d241.5R10i97R11d61.5R12d627.5R13ai1i3i3i3i3i3i3i2i2i1i2i2i2i3i3i3i3i3i3i2i2i3i3i3i3i2i3i3i3i3hg:40oR0d950.5R1ad317.5d247d250.5d362d218d474.5d185.5d587d185.5d702.5d185.5d818d218.25d931.25d251d1044.5d317.5d1159d237.5d1159d162.5d1041.5d125.25d928d88d814.5d88d702.5d88d591d125d478d162d365d237.5d247d317.5d247hR2d399.5R3d317.5R4d88R5d777R6d-135R7d689R8d168R9d241.5R10i40R11d88R12d399.5R13ai1i3i3i3i3i2i3i3i3i3i2hg:96oR0d950.5R1ad183.5d205d324.5d392d248d392d85d205d183.5d205hR2d512R3d324.5R4d85R5d819R6d632R7d734R8d168R9d241.5R10i96R11d85R12d512R13ai1i2i2i2i2hg:39oR0d950.5R1ad183.5d277.5d183.5d555d98.5d555d98.5d277.5d183.5d277.5hR2d281.5R3d183.5R4d98.5R5d746.5R6d469R7d648R8d168R9d241.5R10i39R11d98.5R12d281.5R13ai1i2i2i2i2hg:95oR0d950.5R1ad522d1194d522d1265.5d-10d1265.5d-10d1194d522d1194hR2d512R3d522R4d-10R5d-170R6d-241.5R7d-160R8d168R9d241.5R10i95R11d-10R12d512R13ai1i2i2i2i2hg:38oR0d950.5R1ad249d622.5d203.5d663d182.25d703.25d161d743.5d161d787.5d161d860.5d214d909d267d957.5d347d957.5d394.5d957.5d436d941.75d477.5d926d514d894d249d622.5d319.5d566.5d573.5d826.5d603d782d619.5d731.25d636d680.5d639d623.5d732d623.5d726d689.5d700d754d674d818.5d627.5d881.5d767d1024d641d1024d569.5d950.5d517.5d995d460.5d1016.75d403.5d1038.5d338d1038.5d217.5d1038.5d141d969.75d64.5d901d64.5d793.5d64.5d729.5d98d673.25d131.5d617d198.5d567.5d174.5d536d162d504.75d149.5d473.5d149.5d443.5d149.5d362.5d205d313.25d260.5d264d352.5d264d394d264d435.25d273d476.5d282d519d300d519d391d475.5d367.5d436d355.25d396.5d343d362.5d343d310d343d277.25d370.75d244.5d398.5d244.5d442.5d244.5d468d259.25d493.75d274d519.5d319.5d566.5hR2d798.5R3d767R4d64.5R5d760R6d-14.5R7d695.5R8d168R9d241.5R10i38R11d64.5R12d798.5R13ai1i3i3i3i3i3i3i2i1i2i3i3i2i3i3i2i2i2i3i3i3i3i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3hg:94oR0d950.5R1ad478d277.5d749.5d556d649d556d429d358.5d209d556d108.5d556d380d277.5d478d277.5hR2d858R3d749.5R4d108.5R5d746.5R6d468R7d638R8d168R9d241.5R10i94R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:37oR0d950.5R1ad744.5d695.5d701d695.5d676.25d732.5d651.5d769.5d651.5d835.5d651.5d900.5d676.25d937.75d701d975d744.5d975d787d975d811.75d937.75d836.5d900.5d836.5d835.5d836.5d770d811.75d732.75d787d695.5d744.5d695.5d744.5d632d823.5d632d870d687d916.5d742d916.5d835.5d916.5d929d869.75d983.75d823d1038.5d744.5d1038.5d664.5d1038.5d618d983.75d571.5d929d571.5d835.5d571.5d741.5d618.25d686.75d665d632d744.5d632d228.5d327.5d185.5d327.5d160.75d364.75d136d402d136d467d136d533d160.5d570d185d607d228.5d607d272d607d296.75d570d321.5d533d321.5d467d321.5d402.5d296.5d365d271.5d327.5d228.5d327.5d680d264d760d264d293d1038.5d213d1038.5d680d264d228.5d264d307.5d264d354.5d318.75d401.5d373.5d401.5d467d401.5d561.5d354.75d616d308d670.5d228.5d670.5d149d670.5d102.75d615.75d56.5d561d56.5d467d56.5d374d103d319d149.5d264d228.5d264hR2d973R3d916.5R4d56.5R5d760R6d-14.5R7d703.5R8d168R9d241.5R10i37R11d56.5R12d973R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i1i2i2i2i2i1i3i3i3i3i3i3i3i3hg:93oR0d950.5R1ad311.5d246d311.5d1159d99.5d1159d99.5d1087.5d219d1087.5d219d317.5d99.5d317.5d99.5d246d311.5d246hR2d399.5R3d311.5R4d99.5R5d778R6d-135R7d678.5R8d168R9d241.5R10i93R11d99.5R12d399.5R13ai1i2i2i2i2i2i2i2i2hg:36oR0d950.5R1ad346d1174.5d296d1174.5d295.5d1024d243d1023d190.5d1011.75d138d1000.5d85d978d85d888d136d920d188.25d936.25d240.5d952.5d296d953d296d725d185.5d707d135.25d664d85d621d85d546d85d464.5d139.5d417.5d194d370.5d296d363.5d296d246d346d246d346d362d392.5d364d436d371.75d479.5d379.5d521d393d521d480.5d479.5d459.5d435.75d448d392d436.5d346d434.5d346d648d459.5d665.5d513d710.5d566.5d755.5d566.5d833.5d566.5d918d509.75d966.75d453d1015.5d346d1023d346d1174.5d296d639d296d434d238d440.5d207.5d467d177d493.5d177d537.5d177d580.5d205.25d604.5d233.5d628.5d296d639d346d735d346d951.5d409.5d943d441.75d915.5d474d888d474d843d474d799d443.25d773d412.5d747d346d735hR2d651.5R3d566.5R4d85R5d778R6d-150.5R7d693R8d168R9d241.5R10i36R11d85R12d651.5R13ai1i2i2i3i3i2i3i3i2i3i3i3i3i2i2i2i3i3i2i3i3i2i3i3i3i3i2i1i2i3i3i3i3i1i2i3i3i3i3hg:92oR0d950.5R1ad85d277.5d345d1119d260d1119d0d277.5d85d277.5hR2d345R3d345R4d0R5d746.5R6d-95R7d746.5R8d168R9d241.5R10i92R11d0R12d345R13ai1i2i2i2i2hg:35oR0d950.5R1ad523.5d573.5d378d573.5d336d740.5d482.5d740.5d523.5d573.5d448.5d289d396.5d496.5d542.5d496.5d595d289d675d289d623.5d496.5d779.5d496.5d779.5d573.5d604d573.5d563d740.5d722d740.5d722d817d543.5d817d491.5d1024d411.5d1024d463d817d316.5d817d265d1024d184.5d1024d236.5d817d79d817d79d740.5d255d740.5d297d573.5d136d573.5d136d496.5d316.5d496.5d367.5d289d448.5d289hR2d858R3d779.5R4d79R5d735R6d0R7d656R8d168R9d241.5R10i35R11d79R12d858R13ai1i2i2i2i2i1i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2hg:91oR0d950.5R1ad88d246d300d246d300d317.5d180d317.5d180d1087.5d300d1087.5d300d1159d88d1159d88d246hR2d399.5R3d300R4d88R5d778R6d-135R7d690R8d168R9d241.5R10i91R11d88R12d399.5R13ai1i2i2i2i2i2i2i2i2hg:34oR0d950.5R1ad183.5d277.5d183.5d555d98.5d555d98.5d277.5d183.5d277.5d372.5d277.5d372.5d555d287.5d555d287.5d277.5d372.5d277.5hR2d471R3d372.5R4d98.5R5d746.5R6d469R7d648R8d168R9d241.5R10i34R11d98.5R12d471R13ai1i2i2i2i2i1i2i2i2i2hg:90oR0d950.5R1ad57.5d277.5d644d277.5d644d354.5d172d939d655.5d939d655.5d1024d46d1024d46d947d518d362.5d57.5d362.5d57.5d277.5hR2d701.5R3d655.5R4d46R5d746.5R6d0R7d700.5R8d168R9d241.5R10i90R11d46R12d701.5R13ai1i2i2i2i2i2i2i2i2i2i2hg:33oR0d950.5R1ad154.5d897d256d897d256d1024d154.5d1024d154.5d897d154.5d277.5d256d277.5d256d605d246d783.5d165d783.5d154.5d605d154.5d277.5hR2d410.5R3d256R4d154.5R5d746.5R6d0R7d592R8d168R9d241.5R10i33R11d154.5R12d410.5R13ai1i2i2i2i2i1i2i2i2i2i2i2hg:89oR0d950.5R1ad-2d277.5d106.5d277.5d313.5d584.5d519d277.5d627.5d277.5d363.5d668.5d363.5d1024d262d1024d262d668.5d-2d277.5hR2d625.5R3d627.5R4d-2R5d746.5R6d0R7d748.5R8d168R9d241.5R10i89R11d-2R12d625.5R13ai1i2i2i2i2i2i2i2i2i2hg:32oR0d950.5R1ahR2d325.5R3d0R4d0R5d0R6d0R7d0R8d168R9d241.5R10i32R11d0R12d325.5R13ahg:88oR0d950.5R1ad64.5d277.5d173d277.5d358.5d555d545d277.5d653.5d277.5d413.5d636d669.5d1024d561d1024d351d706.5d139.5d1024d30.5d1024d297d625.5d64.5d277.5hR2d701.5R3d669.5R4d30.5R5d746.5R6d0R7d716R8d168R9d241.5R10i88R11d30.5R12d701.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:87oR0d950.5R1ad34d277.5d136d277.5d293d908.5d449.5d277.5d563d277.5d720d908.5d876.5d277.5d979d277.5d791.5d1024d664.5d1024d507d376d348d1024d221d1024d34d277.5hR2d1012.5R3d979R4d34R5d746.5R6d0R7d712.5R8d168R9d241.5R10i87R11d34R12d1012.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:86oR0d950.5R1ad293d1024d8d277.5d113.5d277.5d350d906d587d277.5d692d277.5d407.5d1024d293d1024hR2d700.5R3d692R4d8R5d746.5R6d0R7d738.5R8d168R9d241.5R10i86R11d8R12d700.5R13ai1i2i2i2i2i2i2i2hg:85oR0d950.5R1ad89d277.5d190.5d277.5d190.5d731d190.5d851d234d903.75d277.5d956.5d375d956.5d472d956.5d515.5d903.75d559d851d559d731d559d277.5d660.5d277.5d660.5d743.5d660.5d889.5d588.25d964d516d1038.5d375d1038.5d233.5d1038.5d161.25d964d89d889.5d89d743.5d89d277.5hR2d749.5R3d660.5R4d89R5d746.5R6d-14.5R7d657.5R8d168R9d241.5R10i85R11d89R12d749.5R13ai1i2i2i3i3i3i3i2i2i2i3i3i3i3i2hg:84oR0d950.5R1ad-3d277.5d628.5d277.5d628.5d362.5d363.5d362.5d363.5d1024d262d1024d262d362.5d-3d362.5d-3d277.5hR2d625.5R3d628.5R4d-3R5d746.5R6d0R7d749.5R8d168R9d241.5R10i84R11d-3R12d625.5R13ai1i2i2i2i2i2i2i2i2hg:83oR0d950.5R1ad548d302d548d400.5d490.5d373d439.5d359.5d388.5d346d341d346d258.5d346d213.75d378d169d410d169d469d169d518.5d198.75d543.75d228.5d569d311.5d584.5d372.5d597d485.5d618.5d539.25d672.75d593d727d593d818d593d926.5d520.25d982.5d447.5d1038.5d307d1038.5d254d1038.5d194.25d1026.5d134.5d1014.5d70.5d991d70.5d887d132d921.5d191d939d250d956.5d307d956.5d393.5d956.5d440.5d922.5d487.5d888.5d487.5d825.5d487.5d770.5d453.75d739.5d420d708.5d343d693d281.5d681d168.5d658.5d118d610.5d67.5d562.5d67.5d477d67.5d378d137.25d321d207d264d329.5d264d382d264d436.5d273.5d491d283d548d302hR2d650R3d593R4d67.5R5d760R6d-14.5R7d692.5R8d168R9d241.5R10i83R11d67.5R12d650R13ai1i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:82oR0d950.5R1ad454.5d674d487d685d517.75d721d548.5d757d579.5d820d682d1024d573.5d1024d478d832.5d441d757.5d406.25d733d371.5d708.5d311.5d708.5d201.5d708.5d201.5d1024d100.5d1024d100.5d277.5d328.5d277.5d456.5d277.5d519.5d331d582.5d384.5d582.5d492.5d582.5d563d549.75d609.5d517d656d454.5d674d201.5d360.5d201.5d625.5d328.5d625.5d401.5d625.5d438.75d591.75d476d558d476d492.5d476d427d438.75d393.75d401.5d360.5d328.5d360.5d201.5d360.5hR2d711.5R3d682R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i82R11d100.5R12d711.5R13ai1i3i3i2i2i2i3i3i2i2i2i2i2i3i3i3i3i1i2i2i3i3i3i3i2hg:81oR0d950.5R1ad403.5d346d293.5d346d228.75d428d164d510d164d651.5d164d792.5d228.75d874.5d293.5d956.5d403.5d956.5d513.5d956.5d577.75d874.5d642d792.5d642d651.5d642d510d577.75d428d513.5d346d403.5d346d545d1010.5d678d1156d556d1156d445.5d1036.5d429d1037.5d420.25d1038d411.5d1038.5d403.5d1038.5d246d1038.5d151.75d933.25d57.5d828d57.5d651.5d57.5d474.5d151.75d369.25d246d264d403.5d264d560.5d264d654.5d369.25d748.5d474.5d748.5d651.5d748.5d781.5d696.25d874d644d966.5d545d1010.5hR2d806R3d748.5R4d57.5R5d760R6d-132R7d702.5R8d168R9d241.5R10i81R11d57.5R12d806R13ai1i3i3i3i3i3i3i3i3i1i2i2i2i3i3i3i3i3i3i3i3i3i3hg:80oR0d950.5R1ad201.5d360.5d201.5d641d328.5d641d399d641d437.5d604.5d476d568d476d500.5d476d433.5d437.5d397d399d360.5d328.5d360.5d201.5d360.5d100.5d277.5d328.5d277.5d454d277.5d518.25d334.25d582.5d391d582.5d500.5d582.5d611d518.25d667.5d454d724d328.5d724d201.5d724d201.5d1024d100.5d1024d100.5d277.5hR2d617.5R3d582.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i80R11d100.5R12d617.5R13ai1i2i2i3i3i3i3i2i1i2i3i3i3i3i2i2i2i2hg:79oR0d950.5R1ad403.5d346d293.5d346d228.75d428d164d510d164d651.5d164d792.5d228.75d874.5d293.5d956.5d403.5d956.5d513.5d956.5d577.75d874.5d642d792.5d642d651.5d642d510d577.75d428d513.5d346d403.5d346d403.5d264d560.5d264d654.5d369.25d748.5d474.5d748.5d651.5d748.5d828d654.5d933.25d560.5d1038.5d403.5d1038.5d246d1038.5d151.75d933.5d57.5d828.5d57.5d651.5d57.5d474.5d151.75d369.25d246d264d403.5d264hR2d806R3d748.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i79R11d57.5R12d806R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:78oR0d950.5R1ad100.5d277.5d236.5d277.5d567.5d902d567.5d277.5d665.5d277.5d665.5d1024d529.5d1024d198.5d399.5d198.5d1024d100.5d1024d100.5d277.5hR2d766R3d665.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i78R11d100.5R12d766R13ai1i2i2i2i2i2i2i2i2i2i2hg:77oR0d950.5R1ad100.5d277.5d251d277.5d441.5d785.5d633d277.5d783.5d277.5d783.5d1024d685d1024d685d368.5d492.5d880.5d391d880.5d198.5d368.5d198.5d1024d100.5d1024d100.5d277.5hR2d883.5R3d783.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i77R11d100.5R12d883.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:76oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d939d565d939d565d1024d100.5d1024d100.5d277.5hR2d570.5R3d565R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i76R11d100.5R12d570.5R13ai1i2i2i2i2i2i2hg:75oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d593d536.5d277.5d666.5d277.5d296d625.5d693d1024d560d1024d201.5d664.5d201.5d1024d100.5d1024d100.5d277.5hR2d671.5R3d693R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i75R11d100.5R12d671.5R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:74oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d972d201.5d1107d150.25d1168d99d1229d-14.5d1229d-53d1229d-53d1144d-21.5d1144d45.5d1144d73d1106.5d100.5d1069d100.5d972d100.5d277.5hR2d302R3d201.5R4d-53R5d746.5R6d-205R7d799.5R8d168R9d241.5R10i74R11d-53R12d302R13ai1i2i2i3i3i2i2i2i3i3i2hg:73oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d1024d100.5d1024d100.5d277.5hR2d302R3d201.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i73R11d100.5R12d302R13ai1i2i2i2i2hg:72oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d583.5d568.5d583.5d568.5d277.5d669.5d277.5d669.5d1024d568.5d1024d568.5d668.5d201.5d668.5d201.5d1024d100.5d1024d100.5d277.5hR2d770R3d669.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i72R11d100.5R12d770R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:71oR0d950.5R1ad609.5d917.5d609.5d717d444.5d717d444.5d634d709.5d634d709.5d954.5d651d996d580.5d1017.25d510d1038.5d430d1038.5d255d1038.5d156.25d936.25d57.5d834d57.5d651.5d57.5d468.5d156.25d366.25d255d264d430d264d503d264d568.75d282d634.5d300d690d335d690d442.5d634d395d571d371d508d347d438.5d347d301.5d347d232.75d423.5d164d500d164d651.5d164d802.5d232.75d879d301.5d955.5d438.5d955.5d492d955.5d534d946.25d576d937d609.5d917.5hR2d793.5R3d709.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i71R11d57.5R12d793.5R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:70oR0d950.5R1ad100.5d277.5d529.5d277.5d529.5d362.5d201.5d362.5d201.5d582.5d497.5d582.5d497.5d667.5d201.5d667.5d201.5d1024d100.5d1024d100.5d277.5hR2d589R3d529.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i70R11d100.5R12d589R13ai1i2i2i2i2i2i2i2i2i2i2hg:126oR0d950.5R1ad749.5d615.5d749.5d704.5d697d744d652.25d761d607.5d778d559d778d504d778d431d748.5d425.5d746.5d423d745.5d419.5d744d412d741.5d334.5d710.5d287.5d710.5d243.5d710.5d200.5d729.75d157.5d749d108.5d790.5d108.5d701.5d161d662d205.75d644.75d250.5d627.5d299d627.5d354d627.5d427.5d657.5d432.5d659.5d435d660.5d439d662d446d664.5d523.5d695.5d570.5d695.5d613.5d695.5d655.75d676.5d698d657.5d749.5d615.5hR2d858R3d749.5R4d108.5R5d408.5R6d233.5R7d300R8d168R9d241.5R10i126R11d108.5R12d858R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:69oR0d950.5R1ad100.5d277.5d572.5d277.5d572.5d362.5d201.5d362.5d201.5d583.5d557d583.5d557d668.5d201.5d668.5d201.5d939d581.5d939d581.5d1024d100.5d1024d100.5d277.5hR2d647R3d581.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i69R11d100.5R12d647R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:125oR0d950.5R1ad128d1119d163d1119d233d1119d254.25d1097.5d275.5d1076d275.5d1004.5d275.5d880.5d275.5d802.5d298d767d320.5d731.5d376d718d320.5d705.5d298d670d275.5d634.5d275.5d556d275.5d432d275.5d361d254.25d339.25d233d317.5d163d317.5d128d317.5d128d246d159.5d246d284d246d325.75d282.75d367.5d319.5d367.5d430d367.5d550d367.5d624.5d394.5d653.25d421.5d682d492.5d682d523.5d682d523.5d753.5d492.5d753.5d421.5d753.5d394.5d782.5d367.5d811.5d367.5d887d367.5d1006.5d367.5d1117d325.75d1154d284d1191d159.5d1191d128d1191d128d1119hR2d651.5R3d523.5R4d128R5d778R6d-167R7d650R8d168R9d241.5R10i125R11d128R12d651.5R13ai1i2i3i3i2i3i3i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2hg:68oR0d950.5R1ad201.5d360.5d201.5d941d323.5d941d478d941d549.75d871d621.5d801d621.5d650d621.5d500d549.75d430.25d478d360.5d323.5d360.5d201.5d360.5d100.5d277.5d308d277.5d525d277.5d626.5d367.75d728d458d728d650d728d843d626d933.5d524d1024d308d1024d100.5d1024d100.5d277.5hR2d788.5R3d728R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i68R11d100.5R12d788.5R13ai1i2i2i3i3i3i3i2i1i2i3i3i3i3i2i2hg:124oR0d950.5R1ad215d241.5d215d1265.5d130d1265.5d130d241.5d215d241.5hR2d345R3d215R4d130R5d782.5R6d-241.5R7d652.5R8d168R9d241.5R10i124R11d130R12d345R13ai1i2i2i2i2hg:67oR0d950.5R1ad659.5d335d659.5d441.5d608.5d394d550.75d370.5d493d347d428d347d300d347d232d425.25d164d503.5d164d651.5d164d799d232d877.25d300d955.5d428d955.5d493d955.5d550.75d932d608.5d908.5d659.5d861d659.5d966.5d606.5d1002.5d547.25d1020.5d488d1038.5d422d1038.5d252.5d1038.5d155d934.75d57.5d831d57.5d651.5d57.5d471.5d155d367.75d252.5d264d422d264d489d264d548.25d281.75d607.5d299.5d659.5d335hR2d715R3d659.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i67R11d57.5R12d715R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:123oR0d950.5R1ad523.5d1119d523.5d1191d492.5d1191d368d1191d325.75d1154d283.5d1117d283.5d1006.5d283.5d887d283.5d811.5d256.5d782.5d229.5d753.5d158.5d753.5d128d753.5d128d682d158.5d682d230d682d256.75d653.25d283.5d624.5d283.5d550d283.5d430d283.5d319.5d325.75d282.75d368d246d492.5d246d523.5d246d523.5d317.5d489.5d317.5d419d317.5d397.5d339.5d376d361.5d376d432d376d556d376d634.5d353.25d670d330.5d705.5d275.5d718d331d731.5d353.5d767d376d802.5d376d880.5d376d1004.5d376d1075d397.5d1097d419d1119d489.5d1119d523.5d1119hR2d651.5R3d523.5R4d128R5d778R6d-167R7d650R8d168R9d241.5R10i123R11d128R12d651.5R13ai1i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i3i3i2i3i3i2hg:66oR0d950.5R1ad201.5d667.5d201.5d941d363.5d941d445d941d484.25d907.25d523.5d873.5d523.5d804d523.5d734d484.25d700.75d445d667.5d363.5d667.5d201.5d667.5d201.5d360.5d201.5d585.5d351d585.5d425d585.5d461.25d557.75d497.5d530d497.5d473d497.5d416.5d461.25d388.5d425d360.5d351d360.5d201.5d360.5d100.5d277.5d358.5d277.5d474d277.5d536.5d325.5d599d373.5d599d462d599d530.5d567d571d535d611.5d473d621.5d547.5d637.5d588.75d688.25d630d739d630d815d630d915d562d969.5d494d1024d368.5d1024d100.5d1024d100.5d277.5hR2d702.5R3d630R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i66R11d100.5R12d702.5R13ai1i2i2i3i3i3i3i2i1i2i2i3i3i3i3i2i1i2i3i3i3i3i3i3i3i3i2i2hg:122oR0d950.5R1ad56.5d464d493.5d464d493.5d548d147.5d950.5d493.5d950.5d493.5d1024d44d1024d44d940d390d537.5d56.5d537.5d56.5d464hR2d537.5R3d493.5R4d44R5d560R6d0R7d516R8d168R9d241.5R10i122R11d44R12d537.5R13ai1i2i2i2i2i2i2i2i2i2i2hg:65oR0d950.5R1ad350d377d213d748.5d487.5d748.5d350d377d293d277.5d407.5d277.5d692d1024d587d1024d519d832.5d182.5d832.5d114.5d1024d8d1024d293d277.5hR2d700.5R3d692R4d8R5d746.5R6d0R7d738.5R8d168R9d241.5R10i65R11d8R12d700.5R13ai1i2i2i2i1i2i2i2i2i2i2i2i2hg:121oR0d950.5R1ad329.5d1076d290.5d1176d253.5d1206.5d216.5d1237d154.5d1237d81d1237d81d1160d135d1160d173d1160d194d1142d215d1124d240.5d1057d257d1015d30.5d464d128d464d303d902d478d464d575.5d464d329.5d1076hR2d606R3d575.5R4d30.5R5d560R6d-213R7d529.5R8d168R9d241.5R10i121R11d30.5R12d606R13ai1i3i3i2i2i2i3i3i2i2i2i2i2i2i2hg:64oR0d950.5R1ad381d755.5d381d827d416.5d867.75d452d908.5d514d908.5d575.5d908.5d610.75d867.5d646d826.5d646d755.5d646d685.5d610d644.25d574d603d513d603d452.5d603d416.75d644d381d685d381d755.5d653.5d905d623.5d943.5d584.75d961.75d546d980d494.5d980d408.5d980d354.75d917.75d301d855.5d301d755.5d301d655.5d355d593d409d530.5d494.5d530.5d546d530.5d585d549.25d624d568d653.5d606d653.5d540.5d725d540.5d725d908.5d798d897.5d839.25d841.75d880.5d786d880.5d697.5d880.5d644d864.75d597d849d550d817d510d765d444.5d690.25d409.75d615.5d375d527.5d375d466d375d409.5d391.25d353d407.5d305d439.5d226.5d490.5d182.25d573.25d138d656d138d752.5d138d832d166.75d901.5d195.5d971d250d1024d302.5d1076d371.5d1103.25d440.5d1130.5d519d1130.5d583.5d1130.5d645.75d1108.75d708d1087d760d1046.5d805d1102d742.5d1150.5d668.75d1176.25d595d1202d519d1202d426.5d1202d344.5d1169.25d262.5d1136.5d198.5d1074d134.5d1011.5d101d929.25d67.5d847d67.5d752.5d67.5d661.5d101.5d579d135.5d496.5d198.5d434d263d370.5d347.5d336.75d432d303d526.5d303d632.5d303d723.25d346.5d814d390d875.5d470d913d519d932.75d576.5d952.5d634d952.5d695.5d952.5d827d873d903d793.5d979d653.5d982d653.5d905hR2d1024R3d952.5R4d67.5R5d721R6d-178R7d653.5R8d168R9d241.5R10i64R11d67.5R12d1024R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i2hg:120oR0d950.5R1ad562d464d359.5d736.5d572.5d1024d464d1024d301d804d138d1024d29.5d1024d247d731d48d464d156.5d464d305d663.5d453.5d464d562d464hR2d606R3d572.5R4d29.5R5d560R6d0R7d530.5R8d168R9d241.5R10i120R11d29.5R12d606R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:63oR0d950.5R1ad195.5d897d297d897d297d1024d195.5d1024d195.5d897d294d823.5d198.5d823.5d198.5d746.5d198.5d696d212.5d663.5d226.5d631d271.5d588d316.5d543.5d345d517d357.75d493.5d370.5d470d370.5d445.5d370.5d401d337.75d373.5d305d346d251d346d211.5d346d166.75d363.5d122d381d73.5d414.5d73.5d320.5d120.5d292d168.75d278d217d264d268.5d264d360.5d264d416.25d312.5d472d361d472d440.5d472d478.5d454d512.75d436d547d391d590d347d633d323.5d656.5d313.75d669.75d304d683d300d695.5d297d706d295.5d721d294d736d294d762d294d823.5hR2d543.5R3d472R4d73.5R5d760R6d0R7d686.5R8d168R9d241.5R10i63R11d73.5R12d543.5R13ai1i2i2i2i2i1i2i2i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i2hg:119oR0d950.5R1ad43d464d135d464d250d901d364.5d464d473d464d588d901d702.5d464d794.5d464d648d1024d539.5d1024d419d565d298d1024d189.5d1024d43d464hR2d837.5R3d794.5R4d43R5d560R6d0R7d517R8d168R9d241.5R10i119R11d43R12d837.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:62oR0d950.5R1ad108.5d520d108.5d429d749.5d661.5d749.5d744.5d108.5d977d108.5d886d623.5d703.5d108.5d520hR2d858R3d749.5R4d108.5R5d595R6d47R7d486.5R8d168R9d241.5R10i62R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:118oR0d950.5R1ad30.5d464d128d464d303d934d478d464d575.5d464d365.5d1024d240.5d1024d30.5d464hR2d606R3d575.5R4d30.5R5d560R6d0R7d529.5R8d168R9d241.5R10i118R11d30.5R12d606R13ai1i2i2i2i2i2i2i2hg:61oR0d950.5R1ad108.5d559d749.5d559d749.5d643d108.5d643d108.5d559d108.5d763d749.5d763d749.5d848d108.5d848d108.5d763hR2d858R3d749.5R4d108.5R5d465R6d176R7d356.5R8d168R9d241.5R10i61R11d108.5R12d858R13ai1i2i2i2i2i1i2i2i2i2hg:117oR0d950.5R1ad87d803d87d464d179d464d179d799.5d179d879d210d918.75d241d958.5d303d958.5d377.5d958.5d420.75d911d464d863.5d464d781.5d464d464d556d464d556d1024d464d1024d464d938d430.5d989d386.25d1013.75d342d1038.5d283.5d1038.5d187d1038.5d137d978.5d87d918.5d87d803hR2d649R3d556R4d87R5d560R6d-14.5R7d473R8d168R9d241.5R10i117R11d87R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:60oR0d950.5R1ad749.5d520d233.5d703.5d749.5d886d749.5d977d108.5d744.5d108.5d661.5d749.5d429d749.5d520hR2d858R3d749.5R4d108.5R5d595R6d47R7d486.5R8d168R9d241.5R10i60R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:116oR0d950.5R1ad187.5d305d187.5d464d377d464d377d535.5d187.5d535.5d187.5d839.5d187.5d908d206.25d927.5d225d947d282.5d947d377d947d377d1024d282.5d1024d176d1024d135.5d984.25d95d944.5d95d839.5d95d535.5d27.5d535.5d27.5d464d95d464d95d305d187.5d305hR2d401.5R3d377R4d27.5R5d719R6d0R7d691.5R8d168R9d241.5R10i116R11d27.5R12d401.5R13ai1i2i2i2i2i2i3i3i2i2i2i3i3i2i2i2i2i2i2hg:59oR0d950.5R1ad120d494.5d225.5d494.5d225.5d621.5d120d621.5d120d494.5d120d897d225.5d897d225.5d983d143.5d1143d79d1143d120d983d120d897hR2d345R3d225.5R4d79R5d529.5R6d-119R7d450.5R8d168R9d241.5R10i59R11d79R12d345R13ai1i2i2i2i2i1i2i2i2i2i2i2hg:115oR0d950.5R1ad453.5d480.5d453.5d567.5d414.5d547.5d372.5d537.5d330.5d527.5d285.5d527.5d217d527.5d182.75d548.5d148.5d569.5d148.5d611.5d148.5d643.5d173d661.75d197.5d680d271.5d696.5d303d703.5d401d724.5d442.25d762.75d483.5d801d483.5d869.5d483.5d947.5d421.75d993d360d1038.5d252d1038.5d207d1038.5d158.25d1029.75d109.5d1021d55.5d1003.5d55.5d908.5d106.5d935d156d948.25d205.5d961.5d254d961.5d319d961.5d354d939.25d389d917d389d876.5d389d839d363.75d819d338.5d799d253d780.5d221d773d135.5d755d97.5d717.75d59.5d680.5d59.5d615.5d59.5d536.5d115.5d493.5d171.5d450.5d274.5d450.5d325.5d450.5d370.5d458d415.5d465.5d453.5d480.5hR2d533.5R3d483.5R4d55.5R5d573.5R6d-14.5R7d518R8d168R9d241.5R10i115R11d55.5R12d533.5R13ai1i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:58oR0d950.5R1ad120d897d225.5d897d225.5d1024d120d1024d120d897d120d494.5d225.5d494.5d225.5d621.5d120d621.5d120d494.5hR2d345R3d225.5R4d120R5d529.5R6d0R7d409.5R8d168R9d241.5R10i58R11d120R12d345R13ai1i2i2i2i2i1i2i2i2i2hg:114oR0d950.5R1ad421d550d405.5d541d387.25d536.75d369d532.5d347d532.5d269d532.5d227.25d583.25d185.5d634d185.5d729d185.5d1024d93d1024d93d464d185.5d464d185.5d551d214.5d500d261d475.25d307.5d450.5d374d450.5d383.5d450.5d395d451.75d406.5d453d420.5d455.5d421d550hR2d421R3d421R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i114R11d93R12d421R13ai1i3i3i3i3i2i2i2i2i2i3i3i3i3i2hg:57oR0d950.5R1ad112.5d1008.5d112.5d916.5d150.5d934.5d189.5d944d228.5d953.5d266d953.5d366d953.5d418.75d886.25d471.5d819d479d682d450d725d405.5d748d361d771d307d771d195d771d129.75d703.25d64.5d635.5d64.5d518d64.5d403d132.5d333.5d200.5d264d313.5d264d443d264d511.25d363.25d579.5d462.5d579.5d651.5d579.5d828d495.75d933.25d412d1038.5d270.5d1038.5d232.5d1038.5d193.5d1031d154.5d1023.5d112.5d1008.5d313.5d692d381.5d692d421.25d645.5d461d599d461d518d461d437.5d421.25d390.75d381.5d344d313.5d344d245.5d344d205.75d390.75d166d437.5d166d518d166d599d205.75d645.5d245.5d692d313.5d692hR2d651.5R3d579.5R4d64.5R5d760R6d-14.5R7d695.5R8d168R9d241.5R10i57R11d64.5R12d651.5R13ai1i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:113oR0d950.5R1ad151.5d744.5d151.5d846d193.25d903.75d235d961.5d308d961.5d381d961.5d423d903.75d465d846d465d744.5d465d643d423d585.25d381d527.5d308d527.5d235d527.5d193.25d585.25d151.5d643d151.5d744.5d465d940d436d990d391.75d1014.25d347.5d1038.5d285.5d1038.5d184d1038.5d120.25d957.5d56.5d876.5d56.5d744.5d56.5d612.5d120.25d531.5d184d450.5d285.5d450.5d347.5d450.5d391.75d474.75d436d499d465d549d465d464d557d464d557d1237d465d1237d465d940hR2d650R3d557R4d56.5R5d573.5R6d-213R7d517R8d168R9d241.5R10i113R11d56.5R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i2i2hg:56oR0d950.5R1ad325.5d669.5d253.5d669.5d212.25d708d171d746.5d171d814d171d881.5d212.25d920d253.5d958.5d325.5d958.5d397.5d958.5d439d919.75d480.5d881d480.5d814d480.5d746.5d439.25d708d398d669.5d325.5d669.5d224.5d626.5d159.5d610.5d123.25d566d87d521.5d87d457.5d87d368d150.75d316d214.5d264d325.5d264d437d264d500.5d316d564d368d564d457.5d564d521.5d527.75d566d491.5d610.5d427d626.5d500d643.5d540.75d693d581.5d742.5d581.5d814d581.5d922.5d515.25d980.5d449d1038.5d325.5d1038.5d202d1038.5d135.75d980.5d69.5d922.5d69.5d814d69.5d742.5d110.5d693d151.5d643.5d224.5d626.5d187.5d467d187.5d525d223.75d557.5d260d590d325.5d590d390.5d590d427.25d557.5d464d525d464d467d464d409d427.25d376.5d390.5d344d325.5d344d260d344d223.75d376.5d187.5d409d187.5d467hR2d651.5R3d581.5R4d69.5R5d760R6d-14.5R7d690.5R8d168R9d241.5R10i56R11d69.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:112oR0d950.5R1ad185.5d940d185.5d1237d93d1237d93d464d185.5d464d185.5d549d214.5d499d258.75d474.75d303d450.5d364.5d450.5d466.5d450.5d530.25d531.5d594d612.5d594d744.5d594d876.5d530.25d957.5d466.5d1038.5d364.5d1038.5d303d1038.5d258.75d1014.25d214.5d990d185.5d940d498.5d744.5d498.5d643d456.75d585.25d415d527.5d342d527.5d269d527.5d227.25d585.25d185.5d643d185.5d744.5d185.5d846d227.25d903.75d269d961.5d342d961.5d415d961.5d456.75d903.75d498.5d846d498.5d744.5hR2d650R3d594R4d93R5d573.5R6d-213R7d480.5R8d168R9d241.5R10i112R11d93R12d650R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hgh";
jeash.ui.Keyboard.BACKSPACE = 8;
jeash.ui.Keyboard.TAB = 9;
jeash.ui.Keyboard.ENTER = 13;
jeash.ui.Keyboard.SHIFT = 16;
jeash.ui.Keyboard.CONTROL = 17;
jeash.ui.Keyboard.CAPS_LOCK = 18;
jeash.ui.Keyboard.ESCAPE = 27;
jeash.ui.Keyboard.SPACE = 32;
jeash.ui.Keyboard.PAGE_UP = 33;
jeash.ui.Keyboard.PAGE_DOWN = 34;
jeash.ui.Keyboard.END = 35;
jeash.ui.Keyboard.HOME = 36;
jeash.ui.Keyboard.LEFT = 37;
jeash.ui.Keyboard.RIGHT = 39;
jeash.ui.Keyboard.UP = 38;
jeash.ui.Keyboard.DOWN = 40;
jeash.ui.Keyboard.INSERT = 45;
jeash.ui.Keyboard.DELETE = 46;
jeash.ui.Keyboard.NUMLOCK = 144;
jeash.ui.Keyboard.BREAK = 19;
jeash.ui.Keyboard.DOM_VK_BACK_SPACE = 8;
jeash.ui.Keyboard.DOM_VK_TAB = 9;
jeash.ui.Keyboard.DOM_VK_RETURN = 13;
jeash.ui.Keyboard.DOM_VK_ENTER = 14;
jeash.ui.Keyboard.DOM_VK_SHIFT = 16;
jeash.ui.Keyboard.DOM_VK_CONTROL = 17;
jeash.ui.Keyboard.DOM_VK_CAPS_LOCK = 20;
jeash.ui.Keyboard.DOM_VK_ESCAPE = 27;
jeash.ui.Keyboard.DOM_VK_SPACE = 32;
jeash.ui.Keyboard.DOM_VK_PAGE_UP = 33;
jeash.ui.Keyboard.DOM_VK_PAGE_DOWN = 34;
jeash.ui.Keyboard.DOM_VK_END = 35;
jeash.ui.Keyboard.DOM_VK_HOME = 36;
jeash.ui.Keyboard.DOM_VK_LEFT = 37;
jeash.ui.Keyboard.DOM_VK_UP = 38;
jeash.ui.Keyboard.DOM_VK_RIGHT = 39;
jeash.ui.Keyboard.DOM_VK_DOWN = 40;
jeash.ui.Keyboard.DOM_VK_INSERT = 45;
jeash.ui.Keyboard.DOM_VK_DELETE = 46;
jeash.ui.Keyboard.DOM_VK_NUM_LOCK = 144;
ApplicationMain.main();
})();
