export const styles = `
    .widget__container * {
        box-sizing: border-box;
    }        
    * {
        margin: 0;
        padding: 0;
    }
    .widget__container {
        box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
        width: 300px;
        min-height: 500px;
        overflow: hidden;
        right: -25px;
        bottom: 75px;
        position: absolute;
        transition: max-height .2s ease;
        font-family: Helvetica, Arial ,sans-serif;
        background-color: #e6e6e6a6;
        border-radius: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    .widget__icon {
        cursor: pointer;
        width: 60%;
        position: absolute;
        top: 18px;
        left: 16px;
        transition: transform .3s ease;
    }
    .widget__hidden {
        transform: scale(0);
    }
    .button__container {
        border: none;
        background-color: #0f172a;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
    }
    .widget__container.hidden {
        max-height: 0px;
    }
    .widget__header {
        padding: 1rem;
        background-color: #000;
        color: #fff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .widget__header h1 {
        font-size: 24px;
        font-weight: 400;
    }
    .widget__messages {
        padding: 1rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .widget__messages .question {
        background-color: rgb(147 197 253);
        padding: 0.5rem;
        border-radius: 25px;
        border-bottom-right-radius: 0px;
        margin-left: auto;
    }
    .widget__messages .answer {
        background-color: rgb(209 213 219);
        padding: 0.5rem;
        border-radius: 15px;
        border-bottom-left-radius: 0px;
        margin-right: auto;
    }
    .widget__form {
        display: flex;
        flex-direction: column;
    }
    .widget__form input {
        border: none;
        outline: none;
        padding: 1rem;
        border-top: 1px solid #000;
    }
    .widget__form button {
        border: none;
        outline: none;
        padding: 0.5rem;
        background-color: #000;
        color: #fff;
        cursor: pointer;
    }
`;

export const MESSAGE_ICON = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
`;

export const CLOSE_ICON = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
`;