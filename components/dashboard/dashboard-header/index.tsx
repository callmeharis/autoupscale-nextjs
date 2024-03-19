import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { StatsCard } from './stats-card'

export function DashboardHeader() {
    return (
        <>
            <div className='px-10 my-5   max-w-7xl m-auto flex rounded-sm  lg:block text-center   sm:hidden  justify-center w-full  sm:px-6 lg:px-8'>
                <Container>
                    <Row>
                      <Col lg='2'>
                      <StatsCard title = 'Total Payment ' price='40$'/>
                      
                      </Col>
                     
                    </Row>
                </Container>
            </div>



        </>
    )
}
