import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./DetailDocPage.css";

import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input/Input";
import RecsShow from "../../components/RecsShow/RecsShow";
import RecsShowSort from "../../components/RecsShow/RecsShowSorted";
import Loading from "../../components/Loading/Loading";

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
      name: "Tax Reg. Number",
    },
    {
      id: 4,
      name: "Category",
    },
  ]);
  const [titles, setTitles] = useState(["Description","Attachments"]);
  const [records, setRecord] = useState([]);
  const [sortedRecords, setSortedRecords] = useState([]);
  const [sort, setSort] = useState(false);

  const functionCaller = () => {
    setRecord(() => {
      return [
        {
          description:
            "lorem ipsum qweqd2asdasdaa dasdasdasdas dasdasdasdasdasdadasas sdasdasdasdasdasdasd asdwd\nssddfsdfsdfsdfsdfsdfs\nafadasdaasdasdadsdasdqw",
          tags: [2019, "Tomás", "987234321", "Fatura"],
          attachments: [],
          SubmitedDate: "2019-02-02",
        },
        {
          description: "lorem ipsum qwe1qdasdasdaawdawdadsdasdqw",
          tags: [2020, "Tomás", "342654321", "Fatura"],
          attachments: [
            {
              id: "12342",
              file: "asdasd/asdasdas/asdassdasdasda.txt",
            },
            {
              id: "12342",
              file: "asdasd/asdasdas/asdassdasdasda.txt",
            },
          ],
          SubmitedDate: "2019-02-01",
        },
        {
          description: "lorem ipsum qw3eqdasdasdaawdawdadsdasdqw",
          tags: [2019, "Jorge", "984234321", "Fatura"],
          attachments: [],
          SubmitedDate: "2019-03-01",
        },
        {
          description: "lorem ipsum qweqd5asdasdaawdawdadsdasdqw",
          tags: [2020, "Miguel", "27654321", "Fatura"],
          attachments: [
            {
              id: "12342",
              file: "asdasd/asdasdas/asdassdasdasda.txt",
            },
          ],
          SubmitedDate: "2020-02-04",
        }
      ];
    });
    setRecordsLoading(false);
    setLoading(false);
  };

  const sortTags = async (el) => {
    setRecordsLoading(true);
    const sortItem = el.target.selectedIndex - 1;
    const valueItem = el.target.value;

    if (sortItem < 0) {
      await setSort(false);
      await setRecord([
        {
          description:
            "lorem ipsum qweqd2asdasdaa dasdasdasdas dasdasdasdasdasdadasas sdasdasdasdasdasdasd asdwd\nssddfsdfsdfsdfsdfsdfs\nafadasdaasdasdadsdasdqw",
          tags: [2019, "Tomás", "987234321", "Fatura"],
          attachments: [],
          SubmitedDate: "2019-02-02",
        },
        {
          description: "lorem ipsum qwe1qdasdasdaawdawdadsdasdqw",
          tags: [2020, "Tomás", "342654321", "Fatura"],
          attachments: [
            {
              id: "12342",
              file: "asdasd/asdasdas/asdassdasdasda.txt",
            },
            {
              id: "12342",
              file: "asdasd/asdasdas/asdassdasdasda.txt",
            },
          ],
          SubmitedDate: "2019-02-01",
        },
        {
          description: "lorem ipsum qw3eqdasdasdaawdawdadsdasdqw",
          tags: [2019, "Jorge", "984234321", "Fatura"],
          attachments: [],
          SubmitedDate: "2019-03-01",
        },
        {
          description: "lorem ipsum qweqd5asdasdaawdawdadsdasdqw",
          tags: [2020, "Miguel", "27654321", "Fatura"],
          attachments: [
            {
              id: "12342",
              file: "asdasd/asdasdas/asdassdasdasda.txt",
            },
          ],
          SubmitedDate: "2020-02-04",
        }
      ]);
      await setTitles(["Description","Attachments"]);
    } else {
      await setSort(true);

      let arrayTemp= []
      for (var [key, valueRec] of Object.entries(records)) {
        if(valueRec){
          var Indexing = arrayTemp.findIndex(x => Object.entries(x)[0][0]==valueRec.tags[sortItem])
          if(Indexing<0){
            arrayTemp.push(JSON.parse(`{"${valueRec.tags[sortItem]}":[]}`))
            await arrayTemp[arrayTemp.findIndex(x => Object.entries(x)[0][0]==valueRec.tags[sortItem])][valueRec.tags[sortItem]].push(JSON.parse(JSON.stringify(valueRec)))
          }
          else{
            await arrayTemp[Indexing][valueRec.tags[sortItem]].push(JSON.parse(JSON.stringify(valueRec)))
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
                  onChange={sortTags.bind(this)}
                />
              </div>
              {/* <ul className="uk-list uk-list-striped"> */}
              {/* <li> */}
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
                  sortedRecords.map((rec, index) => {
                    return <RecsShowSort key={index} record={rec} />;
                  })
                ) : (
                  records.map((rec, index) => {
                    return (
                      // <tr>
                      //   <td className="uk-padding-small uk-width-medium"><span className="spanText"><span>{rec.description}</span></span></td>
                      //   <td className="uk-padding-small">{rec.attachments.length}</td>
                      // </tr>
                      <RecsShow key={index} record={rec} />
                    );
                  })
                ))}
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
      )}
    </>
  );
}
