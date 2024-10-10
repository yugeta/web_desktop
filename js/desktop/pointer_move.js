import { Icon }                 from "../icon.js"
import { Window }               from "../window.js"
import { Storage }              from "../lib/storage.js"
import { Elm2data as IconData } from "../icon/elm2data.js"

/**
 * windowとiconの移動処理
 */

export class PointerMove{
  constructor(e){

    // finish処理
    if(!e.buttons){
      // icon データキャッシュ
      if(PointerMove.pointermove_options){
        switch(PointerMove.pointermove_options.type){
          case "icon":
            new Storage({
              mode : "save",
              name : "icons",
              data : new IconData(PointerMove.pointermove_options.target).datas,
              // data : {
              //   id   : PointerMove.pointermove_options.target.getAttribute("data-id"),
              //   file : this.get_icon_file(PointerMove.pointermove_options.target),
              //   name : PointerMove.pointermove_options.target.querySelector(".name").textContent,
              //   x    : Number(PointerMove.pointermove_options.target.style.getPropertyValue("--x").replace("px","")),
              //   y    : Number(PointerMove.pointermove_options.target.style.getPropertyValue("--y").replace("px","")),
              // }
            })
          break

          case "window":
            new Storage({
              mode : "save",
              name : "windows",
              data : {
                id   : PointerMove.pointermove_options.target.getAttribute("data-id"),
                x    : Number(PointerMove.pointermove_options.target.style.getPropertyValue("--x").replace("px","")),
                y    : Number(PointerMove.pointermove_options.target.style.getPropertyValue("--y").replace("px","")),
                w    : Number(PointerMove.pointermove_options.target.style.getPropertyValue("--w").replace("px","")),
                h    : Number(PointerMove.pointermove_options.target.style.getPropertyValue("--h").replace("px","")),
              }
            })
          break
        }
      }

      if(PointerMove.pointermove_options){
        new Icon({
          mode : "move_end",
          target : PointerMove.pointermove_options.target
        })
        PointerMove.pointermove_options = null

      }
      return
    }
    
    const elm_window        = e.target.closest(".window")
    const elm_window_header = e.target.closest(".window .header")
    const elm_window_resize = e.target.closest(".window .resize")
    const elm_icon          = e.target.closest(".icon")

    // 処理継続用処理（start時処理）
    if(!PointerMove.pointermove_options){
      // Window-Move（拡大表示の際は機能しない）
      if(elm_window_header && !elm_window.getAttribute("data-wide-flg")){
        PointerMove.pointermove_options = {
          type : "window",
          mode : "move",
          target : elm_window,
        }
      }

      // Window-Resize
      if(elm_window_resize){
        PointerMove.pointermove_options = {
          type : "window",
          mode : "resize",
          name : elm_window_resize.getAttribute("name"),
          target : elm_window,
        }
      }

      // Icon-Move
      if(elm_icon){
        PointerMove.pointermove_options = {
          type   : "icon",
          mode   : "move",
          target : elm_icon,
        }
        new Icon({
          mode : "move_start",
          target : elm_icon
        })
      }
    }

    // 継続処理(move)
    else{
      PointerMove.pointermove_options.pointerId = e.pointerId
      PointerMove.pointermove_options.movement = {
        x : e.movementX,
        y : e.movementY,
      }
      switch(PointerMove.pointermove_options.type){
        case "window":
          new Window(PointerMove.pointermove_options)
        break

        case "icon":
          new Icon(PointerMove.pointermove_options)
        break
      }
    }
  }

  get_icon_file(elm){
    const src = elm.querySelector("img").getAttribute("src")
    return src.replace(/^img\/icon\//,"")
  }
}