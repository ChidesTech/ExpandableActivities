import { useState } from "react";

function ExpandableActivities() {

    const [activitiesList, setActivitiesList] = useState([]);
    const [expandedActivities, setExpandedActivities] = useState([]);

    const generateActivity = () => {
        fetch("https://www.boredapi.com/api/activity")
            .then(res => res.json())
            .then(data => {
                setActivitiesList(prev => [...prev, {key : Date.now(), data :data}]);
            })
            .catch(err => console.log(err));
    }

    const expandActivity = (key) =>{
       setExpandedActivities(prev => [...prev, key]);
    }
    const collapseActivity = (key) =>{
       setExpandedActivities(expandedActivities.filter(x => x !== key));
    }
    return <> <div className="d-flex justify-content-center mt-5">
        <button onClick={generateActivity} className="btn-lg btn-primary p-3">Generate Activity</button>
    </div>
        <div className="d-flex flex-column">
            {
                activitiesList.map((obj) => {
                    return <div className="w-75 m-auto mt-5" key={obj.key}>
                        <div className="d-flex justify-content-between ">
                            <h2>{obj.data.activity}</h2>
                            {!expandedActivities.includes(obj.key) ? 
                            <button onClick={expandActivity.bind(this, obj.key)} className="btn btn-success">Expand</button>
                            :
                            <button onClick={collapseActivity.bind(this, obj.key)} className="btn btn-success">Collapse</button>

                        }
                           
                        </div>
                        {
                            expandedActivities.includes(obj.key) && <ul style={{ fontSize: "1.3rem" }}>
                            <li>
                                type : {obj.data.type}
                            </li>
                            <li>
                                participants : {obj.data.participants}
                            </li>
                            <li>
                                price : {obj.data.price}
                            </li>
                            <li>
                                link : {obj.data.link}
                            </li>
                            <li>
                                key : {obj.data.key}
                            </li>
                            <li>
                                accessibility : {obj.data.accessibility}
                            </li>
                        </ul>
                        }
                        
                    </div>
                })
            }
        </div>

    </>

}


export default ExpandableActivities;