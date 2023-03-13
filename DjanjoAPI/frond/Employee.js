
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'

function Employee() {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [employeeData, setEmployeeData] = useState({
    "EmployeeId": 0,
    "EmployeeName": "",
    "Department": "",
    "DateOfJoining": "",
    "PhotoFileName": "",
  })

  useEffect(() => {
    getData()
  }, [])

  const getData = () => axios.get(`http://localhost:8000/employee/`).then(res => setData(res.data))

  const onhandleDepartment = (id) => {
    setOpen(true)
    if (id === 0) {
      setEmployeeData({
        "EmployeeId": 0,
        "EmployeeName": "",
        "Department": "",
        "DateOfJoining": "",
        "PhotoFileName": "",
      })
    } else {
      let d = data.find(item => item.EmployeeId === id)
      setEmployeeData({
        "EmployeeId": d.EmployeeId,
        "EmployeeName": d.EmployeeName,
        "Department": d.Department,
        "DateOfJoining": d.DateOfJoining,
        "PhotoFileName": d.PhotoFileName,
      })
    }
  }
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/employee/${id}`).then(res => { alert(res.data); getData(); })
  }
  const handleSubmit = () => {
    setOpen(false)
    if (employeeData.EmployeeId !== 0) {
      axios.put(`http://localhost:8000/employee/`, {
        "EmployeeId": employeeData.EmployeeId,
        "EmployeeName": employeeData.EmployeeName,
        "Department": employeeData.Department,
        "DateOfJoining": employeeData.DateOfJoining,
        "PhotoFileName": employeeData.PhotoFileName,
      }).then(res => { alert(res.data); getData(); })
    } else {
      axios.post(`http://localhost:8000/employee/`, {
        "EmployeeId": null,
        "EmployeeName": employeeData.EmployeeName,
        "Department": employeeData.Department,
        "DateOfJoining": employeeData.DateOfJoining,
        "PhotoFileName": employeeData.PhotoFileName,
      })
        .then(res => {
          alert(res.data)
          getData()
        },
          (error) => {
            alert('Failed');
          })
    }
  }

  return (
    <div className='p-5'>
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Department Name</th>
            <th>Date Of Joining</th>
            <th>Photo File Name</th>
            <th className='text-center'>Options</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) =>
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.EmployeeId}</td>
              <td>{item.EmployeeName}</td>
              <td>{item.Department}</td>
              <td>{item.DateOfJoining}</td>
              <td>{item.PhotoFileName}</td>
              <td className='text-center '>
                <Button variant="primary" className='py-1 px-3' onClick={e => onhandleDepartment(item.EmployeeId)}>Edit</Button>
                <Button variant="danger" className='ms-3 py-1 px-3' onClick={e => handleDelete(item.EmployeeId)}>Delete</Button>
              </td>
            </tr>
          )}

        </tbody>
      </Table>

      <Button variant="primary" className='py-1 px-3' onClick={e => onhandleDepartment(0)}>Add Employee</Button>

      <Modal
        show={open}
        onHide={e => setOpen(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Departments
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row>
            <Col sm={6}>
              <label className="mb-1"><b>Employee Name</b></label>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  type={'text'} value={employeeData.EmployeeName} onChange={e => setEmployeeData({ ...employeeData, EmployeeName: e.target.value })}
                />
              </InputGroup>

              <label className="mb-1"><b>Department Name</b></label>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  type={'text'} value={employeeData.Department} onChange={e => setEmployeeData({ ...employeeData, Department: e.target.value })}
                />
              </InputGroup>
              <label className="mb-1"><b>Date of Joining</b></label>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  type={'date'} value={employeeData.DateOfJoining} onChange={e => setEmployeeData({ ...employeeData, DateOfJoining: e.target.value })}
                />
              </InputGroup>
            </Col>
            <Col sm={6} style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              <Image width={"200px"} height={"200px"} src={employeeData.PhotoFileName} />
              <label className='text-primary bg-light p-1'>
                select Image
                <input
                  type={"file"}
                  style={{ visibility: "hidden" ,display:"none"}}
                  onChange={e => setEmployeeData({ ...employeeData, PhotoFileName: URL.createObjectURL(e.target.files[0]) })}
                />
              </label>
            </Col>
          </Row>


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={e => setOpen(false)}>Cancel</Button>
          <Button onClick={e => handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Employee