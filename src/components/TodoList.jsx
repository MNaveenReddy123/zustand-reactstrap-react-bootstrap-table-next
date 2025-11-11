import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Badge,
  Alert
} from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import useStore from '../store/useStore'

function TodoList() {
  const [newTodo, setNewTodo] = useState('')
  const todos = useStore(state => state.todos)
  const addTodo = useStore(state => state.addTodo)
  const removeTodo = useStore(state => state.removeTodo)
  const toggleTodo = useStore(state => state.toggleTodo)

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim())
      setNewTodo('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  // Format data for table
  const tableData = todos.map(todo => ({
    id: todo.id,
    todo: todo.todo,
    status: todo.done ? (
      <Badge color="success">✓ Done</Badge>
    ) : (
      <Badge color="warning">⏳ Pending</Badge>
    ),
    done: todo.done
  }))

  // Table columns
  const columns = [
    {
      dataField: 'todo',
      text: '📝 Todo',
      sort: true,
      style: { textDecoration: (row) => row.done ? 'line-through' : 'none' }
    },
    {
      dataField: 'status',
      text: '📊 Status',
      sort: true,
      width: '120px'
    },
    {
      dataField: 'actions',
      text: '⚙️ Actions',
      isDummyField: true,
      formatter: (cell, row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            size="sm"
            color={row.done ? 'warning' : 'success'}
            onClick={() => toggleTodo(row.id)}
            title={row.done ? 'Mark as pending' : 'Mark as done'}
          >
            {row.done ? '↩️' : '✓'}
          </Button>
          <Button
            size="sm"
            color="danger"
            onClick={() => removeTodo(row.id)}
            title="Delete todo"
          >
            🗑️
          </Button>
        </div>
      ),
      width: '140px'
    }
  ]

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    prePageText: '<',
    nextPageText: '>',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: () => { },
    onSizePerPageChange: () => { }
  })

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-warning text-dark">
        <CardTitle className="mb-0">✅ Todo List</CardTitle>
      </CardHeader>
      <CardBody>
        {/* Add Todo Form */}
        <Form className="mb-4 p-3 bg-light rounded">
          <Row>
            <Col md="9">
              <FormGroup>
                <Label for="todoInput" className="mb-2">Add New Todo</Label>
                <Input
                  id="todoInput"
                  type="text"
                  placeholder="Enter a new todo..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={handleKeyPress}
                  bsSize="lg"
                />
              </FormGroup>
            </Col>
            <Col md="3" className="d-flex align-items-end">
              <Button
                color="primary"
                onClick={handleAddTodo}
                size="lg"
                block
              >
                + Add Todo
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Summary Stats */}
        <Row className="mb-4">
          <Col md="4">
            <Alert color="info" className="mb-0 text-center">
              <h5 className="mb-0">📋 Total: <strong>{todos.length}</strong></h5>
            </Alert>
          </Col>
          <Col md="4">
            <Alert color="success" className="mb-0 text-center">
              <h5 className="mb-0">✓ Done: <strong>{todos.filter(t => t.done).length}</strong></h5>
            </Alert>
          </Col>
          <Col md="4">
            <Alert color="warning" className="mb-0 text-center">
              <h5 className="mb-0">⏳ Pending: <strong>{todos.filter(t => !t.done).length}</strong></h5>
            </Alert>
          </Col>
        </Row>

        {/* Todo Table */}
        {todos.length === 0 ? (
          <Alert color="secondary" className="text-center">
            <p className="mb-0">📭 No todos yet. Add one to get started!</p>
          </Alert>
        ) : (
          <BootstrapTable
            keyField="id"
            data={tableData}
            columns={columns}
            striped
            hover
            condensed
            pagination={pagination}
            noDataIndication={() => 'No todos available'}
          />
        )}
      </CardBody>
    </Card>
  )
}

export default TodoList