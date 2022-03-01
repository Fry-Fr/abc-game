import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setPlayerName, toggleOnline } from '../actions';
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { turnOnSocket } from '../utils/socket';

const Main = (props) => {
    const [modalState, setModalState] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        turnOnSocket(props.online);
    },[props.online])

    const handleChange = (e) => {
        if (e.target.value.length === 0 && props.online === true) {
            props.toggleOnline();
        }
        setName(e.target.value);
    }
    const handleNameClick = (e) => {
        setName(props.player);
        setModalState(true);
    }
    const handleOkClick = (e) => {
        props.setPlayerName(name);
        setModalState(false);
    }
    const handleOnline = (e) => {
        props.toggleOnline();
    }
    return (
        <>
        <section className="section-description">
            <p>
                On those boring highway commutes, there's no reason to feel bored. This app shall be here to assist you in playing the alphabet game. (Woo-Hoo).
                You will get access to special features specifically designed for the fun in this application.
                Compete against your friends and family. This app connects your game with other players actively participating.
            </p>
            <p>
                ** This application is not designed to be used by the driver of a vehicle. **
            </p>
            <Button color='light' size='small' onClick={handleNameClick}>Enter name:</Button>
        </section>
        { !modalState ? undefined 
        : 
        <Modal isOpen={modalState}>
            <ModalHeader toggle={() => {
                if (props.player === '' && props.online === true) {
                    props.toggleOnline();
                }
                setModalState(false)
            }}>
                Enter name...
            </ModalHeader>
            <ModalBody>
                <Input type='text' onChange={handleChange} value={name} />
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleOkClick}>Ok</Button>
                <Button onClick={handleOnline} disabled={name.length === 0 ? true : false} >{!props.online ? 'Online ❌' : 'Online ✅'}</Button>
            </ModalFooter>
        </Modal>
         }
        </>
    )
}
const mapToProps = (state) => {
    return{
        player: state.player,
        online: state.online
    }
}
export default connect(mapToProps,{setPlayerName, toggleOnline})(Main);