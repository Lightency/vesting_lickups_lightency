import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Contract } from "near-api-js";
import img from './Light.png';



export default function Vesting() {
  // Interact with the smart contract (call the view methods)
  const [isLoged, setLoged] = useState(false);
  const [ownerId, setOwnerId] = useState(0);
  const [tokenId, setTokenId] = useState(0);
  const [amountOfToken, setAmountOfToken] = useState(0);
  const [lockedAmount, setLockedAmount] = useState(0);
  const [unlockedAmount, setUnlockedAmount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [clifftime, setClifftime] = useState(0);
  const [nbTimeOfPaiment, setNbTimeOfPaiment] = useState(0);
  const [timeOfLocking, setTimeOfLocking] = useState(0);
  const [timeOfFirstPaymenty, setTimeOfFirstpayment] = useState(0);
  const [timeOfSecondPayment, setTimeOfSecondPayment] = useState(0);
  const [timeOfThirdPayment, setTimeOfThirdPayment] = useState(0);
  const [timeOfFourthPayment, setTimeOfFourthPayment] = useState(0);
  const [totalLockedAmount, setTotalLockedAmount] = useState(0);
  const [totalUnlockedAmount, setTotalUnlockedAmount] = useState(0);
  
  React.useEffect(() => {
    window.accountId===''?setLoged(false):setLoged(true);
    window.contract.get_ownerid().then((res) => {
      setOwnerId(res);
    });
    window.contract.get_tokenid().then((res) => {
      setTokenId(res);
    });
    window.contract.get_amount_of_token().then((res) => {
      setAmountOfToken(res);
    });
    window.contract.get_locked_amount().then((res) => {
      setLockedAmount(res);
    });
    window.contract.get_unlocked_amount().then((res) => {
      setUnlockedAmount(res);
    });
    window.contract.get_duration().then((res) => {
      setDuration(res);
    });
    window.contract.get_clifftime().then((res) => {
      setClifftime(res);
    });
    window.contract.get_nb_time_payment().then((res) => {
      setNbTimeOfPaiment(res);
    });
    window.contract.get_timestamp().then((res) => {
      function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      var result = new Array();
      for (var i=0 ; i<ownerId.length ; i++){
      var unixTimestamp = parseInt(res[i]) / 1000000;
      var date = new Date(unixTimestamp);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var time = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
      var year = date.getFullYear();
      var month = padTo2Digits(date.getMonth() + 1);
      var day = padTo2Digits(date.getDate());
      var dateTime = `${year}-${month}-${day} ${time}`;
      result.push(dateTime);
      }
      
      setTimeOfLocking(result);
    });
    //First payment
    window.contract.get_timestamp().then((res) => {
      function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      var result = new Array();
      for (var i=0 ; i<ownerId.length ; i++){
      var unixTimestamp = (parseInt(res[i]) / 1000000)+31556926000;
      var date = new Date(unixTimestamp);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var time = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
      var year = date.getFullYear();
      var month = padTo2Digits(date.getMonth() + 1);
      var day = padTo2Digits(date.getDate());
      var dateTime = `${year}-${month}-${day} ${time}`;
      result.push(dateTime);
      }
      
      setTimeOfFirstpayment(result);
    });
    //Second payment
    window.contract.get_timestamp().then((res) => {
      function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      var result = new Array();
      for (var i=0 ; i<ownerId.length ; i++){
      var unixTimestamp = (parseInt(res[i]) / 1000000)+(2*31556926000);
      var date = new Date(unixTimestamp);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var time = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
      var year = date.getFullYear();
      var month = padTo2Digits(date.getMonth() + 1);
      var day = padTo2Digits(date.getDate());
      var dateTime = `${year}-${month}-${day} ${time}`;
      result.push(dateTime);
      }
      
      setTimeOfSecondPayment(result);
    });
    //Third payment
    window.contract.get_timestamp().then((res) => {
      function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      var result = new Array();
      for (var i=0 ; i<ownerId.length ; i++){
      var unixTimestamp = (parseInt(res[i]) / 1000000)+(3*31556926000);
      var date = new Date(unixTimestamp);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var time = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
      var year = date.getFullYear();
      var month = padTo2Digits(date.getMonth() + 1);
      var day = padTo2Digits(date.getDate());
      var dateTime = `${year}-${month}-${day} ${time}`;
      result.push(dateTime);
      }
      
      setTimeOfThirdPayment(result);
    });
    //Fourth payment
    window.contract.get_timestamp().then((res) => {
      function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      var result = new Array();
      for (var i=0 ; i<ownerId.length ; i++){
      var unixTimestamp = (parseInt(res[i]) / 1000000)+(4*31556926000);
      var date = new Date(unixTimestamp);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var time = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
      var year = date.getFullYear();
      var month = padTo2Digits(date.getMonth() + 1);
      var day = padTo2Digits(date.getDate());
      var dateTime = `${year}-${month}-${day} ${time}`;
      result.push(dateTime);
      }
      
      setTimeOfFourthPayment(result);
    });
    window.contract.get_total_locked_amount().then((res) => {
      setTotalLockedAmount(res);
    });
    window.contract.get_total_unlocked_amount().then((res) => {
      setTotalUnlockedAmount(res);
    });
  });

  const Vest = () => {
    if (isLoged===true){
      return(
        <>
          <Container>
            <Row>
              <Col>Total locked : {totalLockedAmount}</Col>
              <Col>Total unlocked : {totalUnlockedAmount}</Col>
            </Row>
          </Container>
          <div>
            {Object.keys(ownerId).map((owner,index) => (
              <Accordion defaultActiveKey={['0']} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{ownerId[owner]}</Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    <ListGroup.Item>Token ID : {tokenId[index]}</ListGroup.Item>
                    <ListGroup.Item>Amount of token : {amountOfToken[index]} LTS <img src={img}></img></ListGroup.Item>
                    <ListGroup.Item>locked amount : {lockedAmount[index]} LTS <img src={img}></img></ListGroup.Item>
                    <ListGroup.Item>Unlocked amount : {unlockedAmount[index]} LTS <img src={img}></img></ListGroup.Item>
                    <ListGroup.Item>duration : {duration[index]} year(s)</ListGroup.Item>
                    <ListGroup.Item>clifftime : {clifftime[index]} year(s)</ListGroup.Item>
                    <ListGroup.Item>Nb time of paiments : {nbTimeOfPaiment[index]}</ListGroup.Item>
                    <ListGroup.Item>Time of Locking : {timeOfLocking[index]}</ListGroup.Item>
                    <ListGroup.Item>First time of payment : {timeOfFirstPaymenty[index]}</ListGroup.Item>
                    <ListGroup.Item>Second  time of payment : {timeOfSecondPayment[index]}</ListGroup.Item>
                    <ListGroup.Item>third time of payment : {timeOfThirdPayment[index]}</ListGroup.Item>
                    <ListGroup.Item>Fourth time of payment : {timeOfFourthPayment[index]}</ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
              </Accordion>
            ))}
          </div>
        </>
      )
    }else{
      return (
        <>
          <h3>Please login first</h3>
        </>
      )
    }
  }

  return (
    <>
      <Vest/>
    </>
  );
}