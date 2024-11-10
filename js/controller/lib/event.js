import { MouseDown }   from "../../controller/event/mouse_down.js"
import { MouseMove }   from "../../controller/event/mouse_move.js"
import { MouseUp }     from "../../controller/event/mouse_up.js"
import { Click }       from "../../controller/event/click.js"
import { DoubleClick } from "../../controller/event/double_click.js"
import { ContextMenu } from "../../controller/event/context_menu.js"
import { Bootstrap }   from "../../controller/lib/bootstrap.js"

export class Event{
  constructor(){
    Bootstrap.elm_main.addEventListener("mousedown"   , ((e)=> new MouseDown(e)))
    Bootstrap.elm_main.addEventListener("mousemove"   , ((e)=> new MouseMove(e)))
    Bootstrap.elm_main.addEventListener("mouseup"     , ((e)=> new MouseUp(e)))
    Bootstrap.elm_main.addEventListener("click"       , ((e)=> new Click(e)))
    Bootstrap.elm_main.addEventListener("dblclick"    , ((e)=> new DoubleClick(e)))
    Bootstrap.elm_main.oncontextmenu = function(){return false}
    Bootstrap.elm_main.addEventListener("contextmenu" , ((e)=> {new ContextMenu(e);return false}))
  }
}