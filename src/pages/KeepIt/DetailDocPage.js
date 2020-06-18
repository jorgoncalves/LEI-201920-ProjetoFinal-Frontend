import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./DetailDocPage.css";

import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input/Input";
import RecsShow from "../../components/RecsShow/RecsShow";
import RecsShowSort from "../../components/RecsShow/RecsShowSorted";
import Loading from "../../components/Loading/Loading";
import Icon from '../../components/Icon/Icon';

import { geFile } from '../../util/restAddress';

import {
  getRecs
} from '../../util/restCall_records';

import {
  getDocsOnly
} from '../../util/restCall_Docs'

export default function DetailDocPage(props) {
  let { id } = useParams();
  const [documentID] = useState(id);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([
    {
      id: 0,
      name: "Not Selected",
    },
    {
      id: 1,
      name: "Year",
    },
    {
      id: 2,
      name: "Name",
    },
    {
      id: 3,
      name: "Tax Reg. Number (NIF)",
    },
    {
      id: 4,
      name: "Category",
    },
  ]);
  const [titles, setTitles] = useState(["Description","Attachments"]);
  const [records, setRecord] = useState([]);
  const [documentInfo, setDocumentInfo] = useState([]);
  const [sortedRecords, setSortedRecords] = useState([]);
  const [sort, setSort] = useState(false);

  const getRecords = async () => {
    let resp = await getRecs(documentID);
    if (resp.status != 500) {
      if(resp.data)
        setRecord(resp.data.records);

    } else {
      setRecord([`${resp.error}`]);
    }
    setRecordsLoading(false);
  };

  const getDocumentInfo = async () => {
    let resp = await getDocsOnly(null,null,documentID);
    if (resp.status != 500) {
      setDocumentInfo(resp.data.documents[0]);

    } else {
      setDocumentInfo([`${resp.error}`]);
    }
  }

  const functionCaller = async () => {
    await getDocumentInfo();
    await getRecords();
    setLoading(false);
  };

  const sortTags = async (el) => {
    setRecordsLoading(true);
    const sortItem = el.target.selectedIndex - 1;
    const valueItem = el.target.value;

    if (sortItem < 0) {
      await setSort(false);
      await setTitles(["Description","Attachments"]);
    } else {
      await setSort(true);

      let arrayTemp= []
      for (var [key, valueRec] of Object.entries(records)) {
        if(valueRec){
          let tempValue = (valueRec.tags[sortItem]==undefined || valueRec.tags[sortItem]=="") ? ("#") : (valueRec.tags[sortItem]);
          var Indexing = arrayTemp.findIndex(x => Object.entries(x)[0][0] == tempValue)
          if(Indexing<0){
            arrayTemp.push(JSON.parse(`{"${tempValue}":[]}`))
            await arrayTemp[arrayTemp.findIndex(x => Object.entries(x)[0][0]==tempValue)][tempValue].push(JSON.parse(JSON.stringify(valueRec)))
          }
          else{
            await arrayTemp[Indexing][tempValue].push(JSON.parse(JSON.stringify(valueRec)))
          }
        }
        console.log("arrayTemp",arrayTemp)
      } 

      await setSortedRecords(arrayTemp)
      await setTitles([valueItem,"Records"]);
    }
    //await setRecord(records.sort((a,b) => ("" + a.tags[sortItem]).localeCompare(b.tags[sortItem])));
    setRecordsLoading(false);
  };

  useEffect(() => {
    functionCaller();
    return () => {
      setRecordsLoading(true);
      setLoading(true);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar onLogout={props.onLogout} userInfo={props.userInfo} />
          <div className="submitBox">
            <h2 className="uk-heading-divider uk-margin-medium-bottom">
              {documentInfo.name}{documentInfo.status == 'obsolete' ? (<span className="docStatus uk-margin-small-left">(Obsolete)</span>):("")}
            </h2>
            <div className="DocsBox">
              <div className="flexBox">
                <div className="leftBox">
                  {documentInfo.status == 'approved' ? (
                    <Button
                      children="New Record"
                      newClasses="uk-margin-small-bottom inlineT"
                    />
                  ):("")}
                  {documentInfo.isModelFile && (
                    <Icon icon="download" tooltip="Download" link={`${geFile}?path=${documentInfo.path}`} />
                  )}
                </div>
                <div className="rightBox">
                  <Input
                    id="tag"
                    type="select"
                    control="selectOne"
                    newDivClasses="usr_info_put uk-margin-remove-top uk-form-width-large inlineT"
                    newInputClasses="uk-form-width-large"
                    defaultValue="Not Selected"
                    options={tags}
                    onChange={sortTags.bind(this)}
                  />
                </div>
              </div>
              {/* <ul className="uk-list uk-list-striped"> */}
              {/* <li> */}
              <div>
                <div className="grid-container listHeaders">
                  <div className="description">{titles[0]}</div>
                  <div className="attachments">{titles[1]}</div>
                  <div className=""></div>
                </div>
                {/* </li> */}
                {/* </ul> */}
                <ul
                  className="uk-list uk-list-striped  uk-margin-remove-top"
                  uk-accordion="true"
                >
                  {recordsLoading ? ( 
                    <Loading />
                  ) : (sort ? ( 
                    sortedRecords.length>0 ? (
                      sortedRecords.map((rec, index) => {
                        return <RecsShowSort key={index} record={rec} />;
                      })
                    ) : (
                      <h4 className="uk-text-center uk-text-bold uk-margin-medium-top">THERE ARE NO RECORDS</h4>
                    )
                  ) : (
                    records.length>0 ? (
                      records.map((rec, i) => {
                        return (
                          <RecsShow key={i} record={rec} />
                        );
                      })
                    ) : (
                      <h4 className="uk-text-center uk-text-bold uk-margin-medium-top">THERE ARE NO RECORDS</h4>
                    )
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
