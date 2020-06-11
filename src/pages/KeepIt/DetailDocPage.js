import React, { useState, useEffect } from 'react';

import './DetailDocPage.css';

import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';
import Input from '../../components/Form/Input/Input';

export default function DetailDocPage(props) {
  const [tags, setTags] = useState([{
    id:null,
    name:"Not Selected"
  },{
    id:0,
    name:"Year"
  },{
    id:1,
    name:"Name"
  },{
    id:2,
    name:"Tax Reg. Number"
  },{
    id:3,
    name:"Category"
  },]);
  const [records, setRecord] = useState([{
    description:"lorem ipsum qweqdasdasdaawdawdadsdasdqw",
    tags:[2019,"Tomás","987654321","Fatura"],
    attachments:[],
    SubmitedDate:"2019-02-02",
  },{
    description:"lorem ipsum qweqdasdasdaawdawdadsdasdqw",
    tags:[2019,"Tomás","987654321","Fatura"],
    attachments:[{
      id:"12342",
      file:"asdasd/asdasdas/asdassdasdasda.txt"
    },{
      id:"12342",
      file:"asdasd/asdasdas/asdassdasdasda.txt"
    }],
    SubmitedDate:"2019-02-01",
  },{
    description:"lorem ipsum qweqdasdasdaawdawdadsdasdqw",
    tags:[2019,"Tomás","987654321","Fatura"],
    attachments:[],
    SubmitedDate:"2019-02-01",
  },{
    description:"lorem ipsum qweqdasdasdaawdawdadsdasdqw",
    tags:[2020,"Tomás","987654321","Fatura"],
    attachments:[{
      id:"12342",
      file:"asdasd/asdasdas/asdassdasdasda.txt"
    }],
    SubmitedDate:"2020-02-01",
  },]);

  return (
    <>
      <Navbar onLogout={props.onLogout} userInfo={props.userInfo} />
      <div className="submitBox">
        <h2 className="uk-heading-divider uk-margin-medium-bottom">
          TESTE
        </h2>
        <div className="submitBox">
          <div className="leftBox">
            <Button
              children="New Record"
              newClasses="uk-margin-small-bottom"
            />
            <Input
              id="tag"
              type="select"
              control="selectOne"
              newDivClasses="inlineB5 usr_info_put uk-margin-remove-top"
              defaultValue="Year"
              options={tags}
            />
            <div className="max-height">
              <table className="uk-table uk-table-striped uk-table-divider uk-table-hover uk-margin-remove-right">
                <thead>
                  <tr>
                    <th className="uk-padding-small uk-width-medium">Description</th>
                    <th className="uk-width-small uk-padding-small">Attachments</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    records.map((rec, index) => {
                      return(
                        <tr>
                          <td className="uk-padding-small uk-width-medium"><span className="spanText"><span>{rec.description}</span></span></td>
                          <td className="uk-padding-small">{rec.attachments.length}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="rightBox">
            RIGHT
            //Show Tags of record
            //Add links to files
          </div>
        </div>
      </div>
    </>
  );
}
