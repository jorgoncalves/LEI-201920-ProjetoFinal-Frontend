import React from "react";
import UIkit from "uikit";
import FileViewer from "react-file-viewer";
import { Link } from "react-router-dom";

import "./RecsShow.css";

import { geFile } from "../../util/restAddress";
import Icon from "../Icon/Icon";
// Exemplo de como chamar o componente no destino e passar as funcionalidades/aspecto
// <Button design="raised" type="submit" loading={this.props.loading}>
// Login
// </Button>

export default function RecsShow(props) {
  const showMore = (el) => {
    const temp =
      el.target.parentElement.children[1].firstElementChild.firstElementChild;

    if (temp.className == "spanTextLess") {
      temp.className = "spanTextMore";
    } else {
      temp.className = "spanTextLess";
    }
  };

  return (
    <li className="listContainer">
      <a
        className="docsListChild uk-accordion-title"
        href="#"
        onClick={showMore.bind(this)}
      ></a>
      <div className="grid-container">
        <div className="description">
          <span className="spanTextLess">{props.record.description}</span>
        </div>
        <div className="attachments">{props.record.attachments.length}</div>
      </div>
      <div className="uk-accordion-content">
        <div className="moreInfo7">
          {props.record.attachments.map((attachment, index) => {
            const ext = attachment.name.split(".")[
              attachment.name.split(".").length - 1
            ];
            let iconAnchor;
            if (ext === "pdf") iconAnchor = "file-pdf";
            else if (
              ext === "jpeg" ||
              ext === "jpg" ||
              ext === "png" ||
              ext === "gif" ||
              ext === "bmp"
            )
              iconAnchor = "image";
            else if (
              ext === "mp4" ||
              ext === "avi" ||
              ext === "mpg" ||
              ext === "mkv" ||
              ext === "flv" ||
              ext === "wmv" ||
              ext === "mov"
            )
              iconAnchor = "playcircle";
            else if (
              ext === "mp3" ||
              ext === "aac" ||
              ext === "m4a" ||
              ext === "wma"
            )
              iconAnchor = "play";
            else iconAnchor = "file-text";

            return(
              <>
                <a href={`${geFile}?path=${attachment.path}`} className="uk-margin-right uk-margin-small-bottom attachments" key={index}>
                  <Icon icon={iconAnchor} tooltip="Download" />
                  {attachment.name}
                </a>
              </>
            )
            
          })}
        </div>
        <div className="moreInfo3">
          {props.record.tags.map((tag, index) => {
            const Labels = ["Year", "Name", "NIF", "Category"]
            return(tag ? (
              <>
                <b>{Labels[index]}:</b> {tag}<br/>
              </>
            ) : (
              ""
            ))
          })}
        </div>
      </div>
    </li>
  );
}
