import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    width: 100%;
    background: #121a25;
    font-size: 13px;
    color: #61738e;

    * {
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      cursor: url('/images/main/default.cur'), auto;
    }

    a {
      transition: all 0.3s ease;
      color: #c8ddf1;
      text-decoration: none;
      cursor: url('/images/main/pointer.cur'), pointer;
    }

    a:hover {
      -webkit-filter: brightness(120%);
      filter: brightness(120%);
      text-decoration: none;
    }

    input,
    select,
    button {
      background-color: #131f2d;
      border: 1px solid #2c3545;
      color: #7d8a9f;
      padding: 5px 10px;
      font-size: 12px;
      border-radius: 3px;
      transition: all 0.5s ease;
      outline: none;

      &:hover,
      &:focus {
        border: 1px solid #3e4e69;
      }
    }

    button,
    button span,
    button font {
      cursor: url('/images/main/pointer.cur'), pointer;
    }

    sup {
      color: rgb(185, 21, 21);
    }

    table {
      width: 100%;
      border-collapse: collapse;

      th {
        text-align: center;
        background: rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      }

      tbody tr {
        transition: 0.1s;

        &:hover {
          background: rgba(0, 0, 0, 0.2);
        }
      }

      th,
      td {
        padding: 10px 8px;
        text-align: center;
      }

      td {
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      }
    }

    .reset {
      color: #ff0000;
    }
  }
`
