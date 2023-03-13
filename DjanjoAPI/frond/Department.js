import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

function Department() {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [departmentId, setDepartmentId] = useState(0)
  const [departmentName, setDepartmentName] = useState("")

  useEffect(() => {
    getData()
  }, [])

  const getData = () => axios.get(`http://localhost:8000/department/`).then(res => setData(res.data))

  const onhandleDepartment = (id) => {
    setOpen(true)
    if (id === 0) {
      setDepartmentId(0)
      setDepartmentName('')
    } else {
      let d = data.find(item => item.DepartmentId === id)
      setDepartmentId(d.DepartmentId)
      setDepartmentName(d.DepartmentName)
    }
  }
const handleDelete =(id)=>{
  axios.delete(`http://localhost:8000/department/${id}`).then(res => {alert(res.data); getData();})
}
  const handleSubmit = () => {
    setOpen(false)
    if (departmentId !== 0) {     
      axios.put(`http://localhost:8000/department/`,{
        "DepartmentId": departmentId,
        "DepartmentName": departmentName
      }).then(res => {alert(res.data); getData();})
    }else{
    axios.post(`http://localhost:8000/department/`,{
    // fetch(`http://localhost:8000/department/`, {
    //   method: 'POST',
    //   header: {
    //     'Accepts': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
        "DepartmentId": null,
        "DepartmentName": departmentName
      })
    // }).then(res => res.json())
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
            <th>Department ID</th>
            <th>Department Name</th>
            <th className='text-center'>Options</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) =>
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.DepartmentId}</td>
              <td>{item.DepartmentName}</td>
              <td className='text-center '>
                <Button variant="primary" className='py-1 px-3' onClick={e => onhandleDepartment(item.DepartmentId)}>Edit</Button>
                <Button variant="danger" className='ms-3 py-1 px-3' onClick={e=>handleDelete(item.DepartmentId)}>Delete</Button>
              </td>
            </tr>
          )}

        </tbody>
      </Table>

      <Button variant="primary" className='py-1 px-3' onClick={e => onhandleDepartment(0)}>Create Department</Button>

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
         {departmentId!==0 && <>
          <label className="mb-1"><b>Department ID</b></label>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              min={1}
              type={'number'} value={departmentId} onChange={e => setDepartmentId(e.target.value)}
            />
          </InputGroup>
         </>}
          <label className="mb-1"><b>Department Name</b></label>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              type={'text'} value={departmentName} onChange={e => setDepartmentName(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={e => setOpen(false)}>Cancel</Button>
          <Button onClick={e => handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Department