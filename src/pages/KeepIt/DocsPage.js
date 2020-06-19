import React, { useState, useEffect } from "react";

import "./DocsPage.css";

import Navbar from "../../components/Navbar/Navbar";
import DocsShow from "../../components/DocsShow/DocsShow";

import { updateUserInfo } from "../../util/restCall_users";
import { getDocsUser } from "../../util/restCall_Docs";
import Loading from "../../components/Loading/Loading";

export default function DocsPage(props) {
  const [loading, setLoading] = useState(true);
  const [userID] = useState(localStorage.getItem("userID"));
  const [userDisplay, setUserDisplay] = useState([]);

  const [docs, setDocs] = useState([]);

  const functionCaller = async () => {
    const respDocs = await getDocsUser(userID, props.docStatus);
    await setDocs(respDocs.data.documents);

    await setUserDisplay(JSON.parse(localStorage.getItem("userDisp")));
    
    setLoading(false);
  };

  useEffect(() => {
    functionCaller();
  }, []);

  const setQuickAccess = async (doc, setPin, elem) => {
    const tempUserDisplay = userDisplay;
    
    if (setPin)
      tempUserDisplay.quickAccess.push({"documentID":doc.documentID, "name":doc.name});
    else{
      //tempUserDisplay.quickAccess.findIndex(x=> x.documentID == doc.ID)
      tempUserDisplay.quickAccess = tempUserDisplay.quickAccess.filter(function(item) {
        console.log(item.documentID !== doc.documentID)
        return item.documentID !== doc.documentID;
      })
    }
    await updateUserInfo(userID,{user_display:JSON.stringify(tempUserDisplay)})
    localStorage.setItem('userDisp', JSON.stringify(tempUserDisplay));
    setUserDisplay(tempUserDisplay);
  }

  return (
    <>
      <Navbar onLogout={props.onLogout} userInfo={props.userInfo} />
      {loading ? (
        <Loading />
      ) : (
        <div className="DocsBox">
          <h2 className="uk-heading-divider uk-margin-medium-bottom">
            {props.title}
          </h2>
          <div className="DocsBox">
            {/* <ul className="uk-list uk-list-striped"> */}
            {/* <li> */}
            <div className="docsListContainer listHeaders">
              <div className="docsListChild">Name</div>
              <div className="docsListChild">Actions</div>
              <div className="docsListChild">Public</div>
              <div className="docsListChild">External</div>
              <div className="docsListChild">Size</div>
              <div className="docsListChild">Access type</div>
              <div className=""></div>
            </div>
            {/* </li> */}
            {/* </ul> */}
            <ul
              className="uk-list uk-list-striped  uk-margin-remove-top"
              uk-accordion="true"
            >
              {docs.map((file, index) => {
                return (
                  <DocsShow
                    key={index}
                    file={file}
                    docStatus={props.docStatus}
                    userID={userID}
                    setDocs={setDocs}
                    docs={docs}
                    userDisplay={userDisplay}
                    setQuickAccess={setQuickAccess}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
