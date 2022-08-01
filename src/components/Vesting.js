import React,{useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Contract } from 'near-api-js';



const Vesting = props => {
    const [amount, setAmount] = useState('--');
    const [locAmount, setLocAmount] = useState('--');
    const [unlockAmount, setUnlockAmount] = useState('--');

    useEffect(()=>{
        let hello=Contract.get_amount_of_token();
        console.log(hello);
    },[]);
    
    return (
        <div>Hello</div>
        /*<Container>
      <Row>
        <Col>Account ID:</Col>
        <Col>{window.accountId===''?'--':window.accountId}</Col>
      </Row>
      <Row>
        <Col>Amount Of Token</Col>
        <Col>{window.accountId===''?'--':{amount}}</Col>
      </Row>
      <Row>
        <Col>Locked Amount</Col>
        <Col>{window.accountId===''?'--':{locAmount}}</Col>
      </Row>
      <Row>
        <Col>Unlocked Amount</Col>
        <Col>{window.accountId===''?'--':{unlockAmount}}</Col>
      </Row>
    </Container>*/
    );
};

export default Vesting;