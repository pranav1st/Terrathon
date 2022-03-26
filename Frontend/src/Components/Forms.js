import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import './Consumer/Validation';
import './Consumer/Forms.css';
import Form from 'react-bootstrap/Form'


function Cons_Form() {

    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})


    
    const handleSubmit = e => {
        e.preventDefault()
        // get our new errors
        const newErrors = findFormErrors()
        // Conditional logic:
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setErrors(newErrors)
        } else {
            // No errors! Put any logic here for the form submission!
            alert('Thank you for your feedback!')
        }
    }
    
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    const findFormErrors = () => {
        const { ppl_qty, pincode } = form
        const newErrors = {}
        // no. of ppl errors
        if ( !ppl_qty || ppl_qty == '' || ppl_qty <= 0) newErrors.ppl_qty = 'Invalid Entry!'
        else if ( ppl_qty > 30 ) newErrors.ppl_qty = 'Too many people! (Max size = 30)'
        // pincode errors
        if ( !pincode || pincode.length !=6 ) newErrors.pincode = 'Invalid Pincode'
        
        return newErrors
    }
    
    return(
        <div className="Formbox">
            <div className='Formbox-Container'>
                <h3>Food requirements</h3>
                <Form classname="Form-holder">
                    <Form.Group className="mb-3" controlId="formBasicQuantity">
                        <Form.Label>Number of persons *</Form.Label>
                        <Form.Control required type="number" onChange={ e => setField('ppl_qty', e.target.value) } isInvalid={ !!errors.ppl_qty }/>
                        {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                        <Form.Control.Feedback id="invalid-feedback" type="invalid">
                            Invalid Entry (Max size = 30).
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control required type="text" placeholder="Line 1 *" id="addrline1" />
                        <Form.Control type="text" placeholder="Line 2" id="addrline2"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPincode">
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control required type="text" pattern="[0-9]{6}" placeholder="Pincode *" onChange={ e => setField('pincode', e.target.value) } isInvalid={ !!errors.pincode }/>
                        <Form.Control.Feedback id="invalid-feedback" type="invalid">
                            Please provide a valid Pincode.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPincode">
                        <Form.Label>City</Form.Label>
                        <Form.Select className="select-city" aria-label="City">
                        <option value="1">Bangalore</option>
                        <option value="2">Chennai</option>
                        <option value="3">Hyderabad</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Non-veg" />
                    </Form.Group>

                    <Button className="submit-button" onClick={ handleSubmit } type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}
export default Cons_Form