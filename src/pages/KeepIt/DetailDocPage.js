import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import './DetailDocPage.css';

import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';
import Input from '../../components/Form/Input/Input';
import RecsShow from '../../components/RecsShow/RecsShow';

export default function DetailDocPage(props) {
  let { id } = useParams();
  const [documentID] = useState(id);

  const [tags] = useState([
    {
      id: null,
      name: 'Not Selected',
    },
    {
      id: 0,
      name: 'Year',
    },
    {
      id: 1,
      name: 'Name',
    },
    {
      id: 2,
      name: 'Tax Reg. Number',
    },
    {
      id: 3,
      name: 'Category',
    },
  ]);

  const [records] = useState([
    {
      description:
        'lorem ipsum qweqdasdasdaa dasdasdasdas dasdasdasdasdasdadasas sdasdasdasdasdasdasd asdwd\nssddfsdfsdfsdfsdfsdfs\nafadasdaasdasdadsdasdqw',
      tags: [2019, 'Tomás', '987654321', 'Fatura'],
      attachments: [],
      SubmitedDate: '2019-02-02',
    },
    {
      description: 'lorem ipsum qweqdasdasdaawdawdadsdasdqw',
      tags: [2019, 'Tomás', '987654321', 'Fatura'],
      attachments: [
        {
          id: '12342',
          file: 'asdasd/asdasdas/asdassdasdasda.txt',
        },
        {
          id: '12342',
          file: 'asdasd/asdasdas/asdassdasdasda.txt',
        },
      ],
      SubmitedDate: '2019-02-01',
    },
    {
      description: 'lorem ipsum qweqdasdasdaawdawdadsdasdqw',
      tags: [2019, 'Tomás', '987654321', 'Fatura'],
      attachments: [],
      SubmitedDate: '2019-02-01',
    },
    {
      description: 'lorem ipsum qweqdasdasdaawdawdadsdasdqw',
      tags: [2020, 'Tomás', '987654321', 'Fatura'],
      attachments: [
        {
          id: '12342',
          file: 'asdasd/asdasdas/asdassdasdasda.txt',
        },
      ],
      SubmitedDate: '2020-02-01',
    },
  ]);

  const sortTags = (el, teste) => {
    debugger;
  };

  return (
    <>
      <Navbar onLogout={props.onLogout} userInfo={props.userInfo} />
      <div className="submitBox">
        <h2 className="uk-heading-divider uk-margin-medium-bottom">
          DOCUMENT NAME - Records {documentID}
        </h2>
        <div className="DocsBox">
          <div className="leftBox">
            <Button
              children="New Record"
              newClasses="uk-margin-small-bottom inlineT"
            />
          </div>
          <div className="rightBox uk-width-large">
            <Input
              id="tag"
              type="select"
              control="selectOne"
              newDivClasses="usr_info_put uk-margin-remove-top uk-form-width-large inlineT"
              newInputClasses="uk-form-width-large"
              defaultValue="Not Selected"
              options={tags}
              onChange={sortTags.bind(this, tags)}
            />
          </div>
          {/* <ul className="uk-list uk-list-striped"> */}
          {/* <li> */}
          <div className="grid-container listHeaders">
            <div className="description">Description</div>
            <div className="attachments">Attachments</div>
            <div className=""></div>
          </div>
          {/* </li> */}
          {/* </ul> */}
          <ul
            className="uk-list uk-list-striped  uk-margin-remove-top"
            uk-accordion="true"
          >
            {records.map((rec, index) => {
              return (
                // <tr>
                //   <td className="uk-padding-small uk-width-medium"><span className="spanText"><span>{rec.description}</span></span></td>
                //   <td className="uk-padding-small">{rec.attachments.length}</td>
                // </tr>
                <RecsShow key={index} record={rec} />
              );
            })}
            {/* {docs.map((file, index) => {
              return (
                <DocsShow
                  key={index}
                  file={file}
                  docStatus={props.docStatus}
                />
              );
            })} */}
          </ul>
        </div>
        {/* <div className="submitBox">
          <div className="leftBox">
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
        </div> */}
      </div>
    </>
  );
}
