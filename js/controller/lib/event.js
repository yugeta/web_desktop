import { MouseDown }   from "../../controller/desktop/mouse_down.js"
import { MouseMove }   from "../../controller/desktop/mouse_move.js"
import { MouseUp }     from "../../controller/desktop/mouse_up.js"
import { Click }       from "../../controller/desktop/click.js"
import { DoubleClick } from "../../controller/desktop/double_click.js"
import { ContextMenu } from "../../controller/desktop/context_menu.js"
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