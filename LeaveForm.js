import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container } from 'react-bootstrap';

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/leaves', formData);
      setSubmitted(true);
      setError('');
      setFormData({ name: '', email: '', type: '', startDate: '', endDate: '', reason: '' });
    } catch (err) {
      setError('Failed to submit leave request');
    }
  };

  return (
    <Container className="mt-4">
      <h3>Leave Request Form</h3>
      {submitted && <Alert variant="success">Leave request submitted!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>
        
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        
        <Form.Group className="mb-2">
          <Form.Label>Leave Type</Form.Label>
          <Form.Select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="Vacation">Vacation</option>
            <option value="Sick">Sick</option>
            <option value="Emergency">Emergency</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Start Date</Form.Label>
          <Form.Control name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>End Date</Form.Label>
          <Form.Control name="endDate" type="date" value={formData.endDate} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Reason</Form.Label>
          <Form.Control as="textarea" rows={3} name="reason" value={formData.reason} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default LeaveForm;
