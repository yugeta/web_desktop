import { EventMouseDown }   from "../event/mouse_down.js"
import { EventMouseMove }   from "../event/mouse_move.js"
import { EventMouseUp }     from "../event/mouse_up.js"
import { EventClick }       from "../event/click.js"
import { EventDoubleClick } from "../event/double_click.js"
import { EventContextMenu } from "../event/context_menu.js"
import { ModelBootstrap }   from "../model/bootstrap.js"

export class Event{
  constructor(){
    ModelBootstrap.elm_main.addEventListener("mousedown"   , ((e)=> new EventMouseDown(e)))
    ModelBootstrap.elm_main.addEventListener("mousemove"   , ((e)=> new EventMouseMove(e)))
    ModelBootstrap.elm_main.addEventListener("mouseup"     , ((e)=> new EventMouseUp(e)))
    ModelBootstrap.elm_main.addEventListener("click"       , ((e)=> new EventClick(e)))
    ModelBootstrap.elm_main.addEventListener("dblclick"    , ((e)=> new EventDoubleClick(e)))
    ModelBootstrap.elm_main.oncontextmenu = function(){return false}
    ModelBootstrap.elm_main.addEventListener("contextmenu" , ((e)=> {new EventContextMenu(e);return false}))
  }
}