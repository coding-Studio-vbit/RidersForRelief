import React, { useState } from 'react'
import styles from './viewRequest.module.css'
import Navbar from '../../global_ui/nav'
import Button from '../../global_ui/buttons/button'
import axios from "axios"
import { Dialog } from "../../global_ui/dialog/dialog"
import { useHistory } from 'react-router-dom'
import UserDetails from '../current_request/user_details'
import Remarks from '../../global_ui/remarks/remarks'
import Address from '../current_request/address'


function ViewRequest() {
    const [error, seterror] = useState(null);
    const token = localStorage.getItem('token')
    const [isLoading, setisLoading] = useState(false)
    const history = useHistory();
    const [isDeliveryConfirmed, setisDeliveryConfirmed] = useState(false);

    // const [state, setstate] = useState({reqObj:request})

    const {
        location: {
          state
        },
      } = history;

    const makeDelivery = () => {
        setisLoading(true);
        const options = {
            headers: {
                'authorization': 'Bearer ' + token
            }
        }
        axios.post(`${process.env.REACT_APP_URL}/riders/makeDelivery/${location.state}`, options)
        .then((response) => {
            if (response.data.status == "success") {
                setisLoading(false)
                setisDeliveryConfirmed(true);
            }
            else {
                setisLoading(false)
                seterror(response.data.message)
            }
        })
        .catch(function (err) {
            setisLoading(false)
            seterror(err)           
        })             
    }

    return (
            <>
                <Navbar back="true" title="Order Details" style={{ background: '#79CBC5', color: 'white' }} />

                <Dialog
                    isShowing={isDeliveryConfirmed}
                    title="Delivery Confirmed"
                    msg={`Delivery Taken Up with requestID ${location.state}`}
                    onOK={() => {
                        setisDeliveryConfirmed(false)
                        history.push("/current_request");
                    }}
                />

                <div className={styles.currentRequestContent}>

                    <p className={styles.request}>
                        <span >RequestID
                            <span style={{ fontWeight: 'lighter' }}> #{state.reqObj.requestNumber}</span>
                        </span>
                    </p>

                    <UserDetails 
                    covid={state.reqObj.requesterCovidStatus} 
                    name={state.reqObj.name} phone={state.reqObj.phoneNumber}/>                 

                    <Address request={state.reqObj}/>

                    <Remarks remarks={state.reqObj.Remarks}/>                  

                        <p style={{textAlign:'center'}}>Requests</p>                                                
                        <div className={styles.orderType}>
                            {
                                state.reqObj.itemCategories.map((type)=>{
                                    return(
                                        <Button 
                                        fontSize="0.9rem"
                                        text={type} 
                                        key={type} bgColor="#ff7978" 
                                        color="black"
                                        isRounded="true"
                                        borderRadius="16px"
                                        
                                        />
                                    )
                                })                               
                            }                           
                        </div>

                        <div className={styles.itemsListList}>
                            <table>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                </tr>
                                {
                                    state.reqObj.itemsListList.map((object) => {
                                        return <tr key={object.itemName}>
                                            <td>{object.itemName}</td>
                                            <td>{object.quantity}</td>
                                        </tr>
                                    })
                                }
                            </table>
                        </div>
                        <div>
                        {
                            state.reqObj.requestStatus === "PENDING" &&
                            <div style={{ marginTop: '50px', textAlign: 'center' }}>
                                <Button text="Make Delivery" isRounded="true" isBlock="true" isElevated="true"
                                    onClick={() => makeDelivery()}
                                />
                            </div>
                        }  

                        </div>
                                      
                    
                </div>
            </>                             
    )
}

export default ViewRequest;




const request = {
    requestNumber: "8628290",
    requesterID: "8628290",
    requestStatus: "DELIVERED",
    requesterCovidStatus: true,
    requestType: "GENERAL",
    name: "Mark Zucc",
    phoneNumber: "9999999999",
    itemsListImages: [
      //  "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    ],
    riderID: {
      name: "Someone",
    },
    itemsListList: [
      {
        itemName: "Tomato",
        quantity: "2kg",
      },
      {
        itemName: "Zomato",
        quantity: "2kg",
      },
    ],
    itemCategories: ["MEDICINES", "MISC"],
    remarks: "Please delivery ASAP here",
    billsImageList: [
      // "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    ],
    rideImages: [
      // "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    ],
    pickupLocationAddress: {
      addressLine: "Some place far away",
      area: "",
      city: "Unknown",
      
    },
    dropLocationAddress: {
        addressLine: "Some place far away",
        area: "",
        city: "Unknown",
        
      },
    // {
    //   addressLine: "Some place far away",
    //   area: "",
    //   city: "Unknown",
    //   pincode: "XXXXXX",
    // }
    pickupLocationCoordinates: {
      coordinates: [17.9, 78.6],
    },
    dropLocationCoordinates: {
      coordinates: [17.9, 78.6],
    },
  };
  