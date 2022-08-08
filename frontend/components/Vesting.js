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
  const [isPaid, setIsPaid] = useState(false);
  const [nbTimeOfPaiment, setNbTimeOfPaiment] = useState(0);
  const [timeOfPaiments, setTimeOfPaiments] = useState(0);
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
    window.contract.is_paid().then((res) => {
      setIsPaid(res);
    });
    window.contract.get_nb_time_payment().then((res) => {
      setNbTimeOfPaiment(res);
    });
    window.contract.get_time_of_payments().then((res) => {
      setTimeOfPaiments(res);
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
          
          <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{ownerId[0]}</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                <ListGroup.Item>Token ID : {tokenId[0]}</ListGroup.Item>
                <ListGroup.Item>Amount of token : {amountOfToken[0]} LTS <img src={img}></img></ListGroup.Item>
                <ListGroup.Item>locked amount : {lockedAmount[0]} LTS <img src={img}></img></ListGroup.Item>
                <ListGroup.Item>Unlocked amount : {unlockedAmount[0]} LTS <img src={img}></img></ListGroup.Item>
                <ListGroup.Item>duration : {duration[0]} year(s)</ListGroup.Item>
                <ListGroup.Item>clifftime : {clifftime[0]} year(s)</ListGroup.Item>
                <ListGroup.Item>Paid ? : {isPaid[0]}</ListGroup.Item>
                <ListGroup.Item>Nb time of paiments : {nbTimeOfPaiment[0]}</ListGroup.Item>
                <ListGroup.Item>Time of paiments : {timeOfPaiments[0]}</ListGroup.Item>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
          <Accordion.Header>{ownerId[1]}</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                <ListGroup.Item>Token ID : {tokenId[1]}</ListGroup.Item>
                <ListGroup.Item>Amount of token : {amountOfToken[1]} LTS <img src={img}></img></ListGroup.Item>
                <ListGroup.Item>locked amount : {lockedAmount[1]} LTS <img src={img}></img></ListGroup.Item>
                <ListGroup.Item>Unlocked amount : {unlockedAmount[1]} LTS <img src={img}></img></ListGroup.Item>
                <ListGroup.Item>duration : {duration[1]} year(s)</ListGroup.Item>
                <ListGroup.Item>clifftime : {clifftime[1]} year(s)</ListGroup.Item>
                <ListGroup.Item>Paid ? : {isPaid[1]}</ListGroup.Item>
                <ListGroup.Item>Nb time of paiments : {nbTimeOfPaiment[1]}</ListGroup.Item>
                <ListGroup.Item>Time of paiments : {timeOfPaiments[1]}</ListGroup.Item>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>
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