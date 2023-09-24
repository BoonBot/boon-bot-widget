import { CLOSE_ICON, MESSAGE_ICON, styles } from "./assets.js";
import "https://cdn.socket.io/4.6.0/socket.io.min.js";

export default class BotClient {
  constructor(userId, botId, position = "bottom-right") {
    this.userId = userId;
    this.botId = botId;
    this.position = this.getPosition(position);
    this.open = true;
    this.initialize();
    this.injectStyles();
    this.answerDiv = null;
    this.idx = -1;
    this.socket = io("http://localhost:8080");
    this.socket.on("connect", () => {
      console.log("connected");
      this.socket.emit("bot_create", { user_id: userId, bot_id: botId });

      this.socket.on("bot_ready", (data) => {
        console.log("Bot ready:", data.state, data.message);
      });
      this.socket.on("bot_answer", (data) => {
        if (data.done) return;
        this.answerDiv.innerText += data.answer;
      });
    });
  }

  position = "";
  open = true;
  widgetContainer = null;

  getPosition(position) {
    const [vertical, horizontal] = position.split("-");
    return {
      [vertical]: "30px",
      [horizontal]: "30px",
    };
  }

  async initialize() {
    /**
     * Create and append a div element to the document body
     */
    const container = document.createElement("div");
    container.style.position = "fixed";
    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );
    document.body.appendChild(container);

    /**
     * Create a button element and give it a class of button__container
     */
    const buttonContainer = document.createElement("button");
    buttonContainer.classList.add("button__container");

    /**
     * Create a span element for the widget icon, give it a class of `widget__icon`, and update its innerHTML property to an icon that would serve as the widget icon.
     */
    const widgetIconElement = document.createElement("span");
    widgetIconElement.innerHTML = MESSAGE_ICON;
    widgetIconElement.classList.add("widget__icon");
    this.widgetIcon = widgetIconElement;

    /**
     * Create a span element for the close icon, give it a class of `widget__icon` and `widget__hidden` which would be removed whenever the widget is closed, and update its innerHTML property to an icon that would serve as the widget icon during that state.
     */
    const closeIconElement = document.createElement("span");
    closeIconElement.innerHTML = CLOSE_ICON;
    closeIconElement.classList.add("widget__icon", "widget__hidden");
    this.closeIcon = closeIconElement;

    /**
     * Append both icons created to the button element and add a `click` event listener on the button to toggle the widget open and close.
     */
    buttonContainer.appendChild(this.widgetIcon);
    buttonContainer.appendChild(this.closeIcon);
    buttonContainer.addEventListener("click", this.toggleOpen.bind(this));

    /**
     * Create a container for the widget and add the following classes:- `widget__hidden`, `widget__container`
     */
    this.widgetContainer = document.createElement("div");
    this.widgetContainer.classList.add("widget__container"); // TODO: "widget__hidden", 

    /**
     * Invoke the `createWidget()` method
     */
    this.createWidgetContent();

    /**
     * Append the widget's content and the button to the container
     */
    container.appendChild(this.widgetContainer);
    container.appendChild(buttonContainer);
  }

  createWidgetContent() {
    this.widgetContainer.innerHTML = `
      <div class="widget__header">
        <h1>Boon</h1>
      </div>
    `;

    const messagesContainer = document.createElement("div");
    messagesContainer.classList.add("widget__messages");
    this.widgetContainer.appendChild(messagesContainer);

    const form = document.createElement("form");
    form.classList.add("widget__form");
    const messageInput = document.createElement("input");
    messageInput.placeholder = "Type a message...";
    const submitButton = document.createElement("button");
    submitButton.innerHTML = "Send";
    submitButton.type = "submit";
    form.appendChild(messageInput);
    form.appendChild(submitButton);
    form.onsubmit = (e) => {
      e.preventDefault();
      this.idx += 1
      const question = messageInput.value;
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");
      questionDiv.innerHTML = question;
      messagesContainer.appendChild(questionDiv);
      messageInput.value = "";

      this.answerDiv = document.createElement("div");
      this.answerDiv.classList.add("answer");
      messagesContainer.appendChild(this.answerDiv);

      this.socket.emit("bot_ask", { idx: this.idx, user_id: this.userId, bot_id: this.botId, question });
    }
    this.widgetContainer.appendChild(form);
  }

  injectStyles() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles.replace(/^\s+|\n/gm, "");
    document.head.appendChild(styleTag);
  }

  toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      this.widgetIcon.classList.add("widget__hidden");
      this.closeIcon.classList.remove("widget__hidden");
      this.widgetContainer.classList.remove("widget__hidden");
    } else {
      this.createWidgetContent();
      this.widgetIcon.classList.remove("widget__hidden");
      this.closeIcon.classList.add("widget__hidden");
      this.widgetContainer.classList.add("widget__hidden");
    }
  }
}