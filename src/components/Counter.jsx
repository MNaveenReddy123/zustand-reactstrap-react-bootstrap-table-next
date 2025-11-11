import React from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, ButtonGroup, Row, Col } from 'reactstrap'
import useStore from '../store/useStore'

export default function Counter() {
  const counts = useStore(state => state.counts)
  const increment = useStore(state => state.increase)
  const decrement = useStore(state => state.decrease)
  const resetCount = useStore(state => state.resetCount)

  return (
    <Card className="shadow-sm h-100">
      <CardHeader className="bg-success text-white">
        <CardTitle className="mb-0">🔢 Counter</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="text-center mb-4">
          <h1 className="display-3 text-success font-weight-bold">{counts}</h1>
        </div>
        <Row className="mt-4">
          <Col md="12">
            <ButtonGroup size="lg" style={{ width: '100%', display: 'flex' }}>
              <Button 
                color="danger" 
                onClick={() => decrement()}
                style={{ flex: 1 }}
              >
                <strong>−</strong>
              </Button>
              <Button 
                color="primary" 
                onClick={() => increment()}
                style={{ flex: 1 }}
              >
                <strong>+</strong>
              </Button>
              <Button 
                color="warning" 
                onClick={resetCount}
                style={{ flex: 1 }}
              >
                Reset
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
