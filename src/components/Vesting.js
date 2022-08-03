import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Contract } from "near-api-js";

export default function Vesting() {
  // token id from the contract
  const [lockedAmount, setLockedAmount] = useState(0);
  const [unlockedAmount, setUnlockedAmount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [clifftime, setClifftime] = useState(0);

  React.useEffect(() => {
    window.contract.get_locked_amount().then((res) => {
      setLockedAmount(res);
    });
    window.contract.get_duration().then((res) => {
      setDuration(res);
    });

    window.contract.get_clifftime().then((res) => {
      setClifftime(res);
    });
  });

  return (
    <>
      <h2> locked amount : {lockedAmount}</h2>
      <h3>owner id : {window.accountId} </h3>
      <h3>duration : {duration} years</h3>
      <h3>clifftime : {clifftime} year </h3>
    </>
  );
}
