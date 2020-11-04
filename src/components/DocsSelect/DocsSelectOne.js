import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './DocsSelect.css';
// import UserPopup from './UserPopup/UserPopup';

import { getDocsUser } from '../../util/restCall_Docs';
// import Loading from "../../components/Loading/Loading";

export default function SelectOne(props) {
    const [userID] = useState(localStorage.getItem('userID'));
    const [loading, setLoading] = useState(true);
    const [docs, setDocs] = useState([]);
    const [filteredDocs, setFilteredDocs] = useState([]);

    // const [tempEl, setTempEl] = useState({ name: "", userID: "" });

    // const addSelected = (user, event) => {
    //   event.target.parentElement.style.display = "none";
    //   if (user.name !== "Add new" && props.addNew !== undefined) changeAddNew();

    //   props.select(user);
    //   setTempEl(user);
    //   props.setSubmitValidation((prevState) => {
    //     return { ...prevState, [props.validationField]: true };
    //   });
    //   if (props.validationField === "documentName")
    //     props.setSaveValidation((prevState) => {
    //       return { ...prevState, [props.validationField]: true };
    //     });
    //   if (
    //     (Object.keys(props.selected).length === 0 ||
    //       props.selected.name === "") &&
    //     props.selected.constructor === Object
    //   )
    //     props.setInfo([...props.Info.filter((u) => u.userID !== user.userID)]);
    //   else
    //     props.setInfo([
    //       ...props.Info.filter((u) => u.userID !== user.userID),
    //       props.selected,
    //     ]);
    // };

    // const removeSelected = (user, event) => {
    //   console.log(user);
    //   setTempEl({ name: "", userID: "" });
    //   props.select({ name: "", userID: "" });
    //   props.setSubmitValidation((prevState) => {
    //     return { ...prevState, [props.validationField]: false };
    //   });
    //   if (props.validationField === "documentName")
    //     props.setSaveValidation((prevState) => {
    //       return { ...prevState, [props.validationField]: false };
    //     });
    //   if (props.addNew !== undefined) props.setAddNew(false);
    //   if (user.name !== "") props.setInfo([...props.Info, user]);
    // };

    const unShowList = (e) => {
        let temp = e.target.parentElement.parentElement.children[1];
        setTimeout(() => {
            temp.style.display = 'none';
        }, 100);
    };

    const showList = async (e) => {
        const elementTemp = e.target.parentElement.parentElement.children[1];
        const resp = await getDocsUser(userID, 'approved');
        elementTemp.style.display = 'block';
        await setDocs(resp.data.documents);
        await setFilteredDocs(resp.data.documents);
        setLoading(false);
    };

    const filterDocs = (el) => {
        let temparray = [];
        const elemValue = el.target.value.toLowerCase();
        if (elemValue === '') {
            setFilteredDocs(docs);
        } else {
            // docs.map((doc, index) => {
            //   console.log(doc.name.toLowerCase().includes(elemValue), doc.name);
            //   if (doc.name.toLowerCase().includes(elemValue)) {
            //     temparray.push(doc);
            //   }
            // });
            for (const doc of docs) {
                console.log(doc.name.toLowerCase().includes(elemValue), doc.name);
                if (doc.name.toLowerCase().includes(elemValue)) {
                    temparray.push(doc);
                }
            }
            setFilteredDocs(temparray);
        }
    };

    return (
        <>
            <div className="docsSelect">
                {props.label && (
                    <label className="uk-text-emphasis" htmlFor={props.id}>
                        {props.label}
                    </label>
                )}
                <div className="docsInput" onBlur={unShowList.bind(this)}>
                    <form className="uk-search uk-form-width-large">
                        <span className="uk-search-icon-flip uk-margin-small-right" uk-search-icon="true"></span>
                        <input
                            className="uk-input textInput uk-form-width-large uk-search-input searchBar"
                            type="search"
                            placeholder={props.title}
                            onFocus={showList.bind(this)}
                            onKeyUp={filterDocs.bind(this)}
                            autoComplete="off"
                        />
                    </form>
                    <div className="docsInputDropdown docsSelect">
                        {loading ? (
                            <div className="uk-input uk-form-width-large waitSelection">
                                <div uk-spinner="ratio: 1"></div>
                            </div>
                        ) : filteredDocs.length > 0 ? (
                            filteredDocs.map((doc, index) => {
                                return (
                                    <Link
                                        className="uk-input uk-form-width-large selection"
                                        key={index}
                                        to={`/records/${doc.documentID}`}
                                    >
                                        {doc.name}
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="uk-input uk-form-width-large selection">There are no Documents</div>
                        )}
                    </div>
                    {/* 
          {Object.keys(props.selected).length >= 2 &&
            props.selected.constructor === Object &&
            props.selected.name !== '' && (
              <UserPopup user={props.selected}>
                {props.disabledSelected ||
                  (!props.disabled && (
                    <i
                      className="iconActUser"
                      uk-icon="icon: close;"
                      onClick={removeSelected.bind(this, props.selected)}
                    ></i>
                  ))}
              </UserPopup>
            )} */}
                </div>
            </div>
        </>
    );
}
