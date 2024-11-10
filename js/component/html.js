export const Html = {}

Html.background_modal = `
<link rel="stylesheet" href="css/background_modal.css"/>

<div id="background_modal">
  <ul class="colors">

    <li>
      <label>
        <input type="radio" name="background" value="linear-gradient(-45deg, #6bd8e5, #98cead)" hidden checked>
        <p class="preview" style="background:linear-gradient(-45deg, #6bd8e5, #98cead)"></p>
        <p class="name">Normal</p>
      </label>
    </li>

    <li>
      <label>
        <input type="radio" name="background" value="linear-gradient(-45deg, #907fe7, #ce98b2)" hidden>
        <p class="preview" style="background:linear-gradient(-45deg, #907fe7, #ce98b2)"></p>
        <p class="name">Purple</p>
      </label>
    </li>

    <li>
      <label>
        <input type="radio" name="background" value="linear-gradient(-45deg, #8be56b, #98ccce)" hidden>
        <p class="preview" style="background:linear-gradient(-45deg, #71ba57, #98bdce)"></p>
        <p class="name">Green</p>
      </label>
    </li>

    <li>
      <label>
        <input type="radio" name="background" value="linear-gradient(-45deg, #ba9157, #cec898)" hidden>
        <p class="preview" style="background:linear-gradient(-45deg, #e3ae65, #e9e2ac)"></p>
        <p class="name">Orange</p>
      </label>
    </li>

  </ul>
</div>`

Html.context_menu_item = `<li class="item" data-mode="{{mode}}">{{name}}</li>`

Html.icon = `
<div class="icon" type="{{type}}" data-id="{{id}}" style="--x:{{x}}px;--y:{{y}}px;--z:{{z}};" data-move="{{move}}">
  <img src="{{icon}}" onerror="this.onerror=null;this.src='img/icon/file_{{type}}.svg';">
  <p class="name">{{name}}</p>
</div>`

Html.window = `
<div class="window" data-type="{{type}}" data-id="{{id}}" data-view-type="icon" style="--x:{{x}}px;--y:{{y}}px;--w:{{w}}px;--h:{{h}}px;--z:{{z}};">
  <div class="header">
    <img class="thumb" src="{{icon}}" draggable="false">
    <span class="name">{{name}}</span>
    <div class="view-type"></div>
    <div class="wide"></div>
    <div class="close"></div>
  </div>
  <div class="body"></div>
  <div class="resize" name="horizontal"></div>
  <div class="resize" name="vertical"></div>
  <div class="resize" name="both"></div>
</div>`
