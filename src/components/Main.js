import { useState } from 'react';
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Main = ({ name, setName }) => {
    const [modalState, setModalState] = useState(false);

    const handleChange = (e) => {
        setName(e.target.value)
    }
    const handleNameClick = (e) => {
        setModalState(true)
    }
    const handleOkClick = (e) => {
        setModalState(false)
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
            <ModalHeader toggle={() => setModalState(false)}>
                Enter name...
            </ModalHeader>
            <ModalBody>
                <Input type='text' onChange={handleChange} value={name} />
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleOkClick}>Ok</Button>
            </ModalFooter>
        </Modal>
         }
        </>
    )
}
export default Main;