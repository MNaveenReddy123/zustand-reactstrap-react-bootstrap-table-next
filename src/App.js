import React from 'react'
import { Container, Row, Col, Card, CardBody, CardHeader, CardTitle, CardText } from 'reactstrap'
import dayjs from 'dayjs'
import Counter from './components/Counter'
import TodoList from './components/TodoList'
import useStore from './store/useStore'


export default function App() {
  // example of using a selector for a derived value
  const doneCount = useStore(state => state.todos.filter(t => t.done).length)
  const count = useStore(state => state.counts)
  const totalTodos = useStore(state => state.todos.length)

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col lg="12">
          <Card className="shadow-sm">
            <CardHeader className="bg-primary text-white">
              <CardTitle className="mb-0">📊 Zustand Demo Application — {dayjs().format('dddd, MMMM D, YYYY')}</CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>
                A modern demo showcasing a counter and a todo list using Zustand store with Reactstrap UI components with Todos rendered using react-bootstrap-table-next.
              </CardText>
              <CardText className="text-muted small mb-0">This header displays today's date using the <code>dayjs</code> library.</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg="6" md="12" className="mb-3">
          <Counter />
        </Col>
        <Col lg="6" md="12" className="mb-3">
          <Card className="shadow-sm h-100">
            <CardHeader className="bg-info text-white">
              <CardTitle className="mb-0">📈 Store Summary</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="mb-3">
                <h5 className="text-muted">Counter</h5>
                <h3 className="text-primary">{count}</h3>
              </div>
              <div className="mb-3">
                <h5 className="text-muted">Total Todos</h5>
                <h3 className="text-info">{totalTodos}</h3>
              </div>
              <div>
                <h5 className="text-muted">Completed Todos</h5>
                <h3 className="text-success">{doneCount}</h3>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg="12">
          <TodoList />
        </Col>
      </Row>

      <Row>
        <Col lg="12">
          <Card className="bg-light">
            <CardBody className="text-center text-muted">
              <small>💾 State is persisted to localStorage under the key <code>zustand-storage</code></small>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}