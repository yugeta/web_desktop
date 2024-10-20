import { Mousedown }   from "../desktop/mousedown.js"
import { Click }       from "../desktop/click.js"
import { DoubleClick } from "../desktop/double_click.js"
import { PointerMove } from "../desktop/pointer_move.js"
import { ContextMenu } from "../desktop/context_menu.js"
import { Bootstrap }   from "../lib/bootstrap.js"

export class Event{
  constructor(){
    Bootstrap.elm_main.addEventListener("mousedown"   , ((e)=> new Mousedown(e)))
    Bootstrap.elm_main.addEventListener("click"       , ((e)=> new Click(e)))
    Bootstrap.elm_main.addEventListener("dblclick"    , ((e)=> new DoubleClick(e)))
    Bootstrap.elm_main.addEventListener("pointermove" , ((e)=> new PointerMove(e)))
    Bootstrap.elm_main.addEventListener("contextmenu" , ((e)=> new ContextMenu(e)))
  }
}