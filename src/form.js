import React, { useState } from 'react';
import axios from 'axios';
import PieChart from './chart';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';




const MyForm = () => {
    const [formData, setFormData] = useState({
        companyName: 'testCompany',
        agreementStartDate: '',
        numberOfAllocatedShares: '',
        cliffPeriod: '',
        vestingPeriod: '',
        vestingPercentage: '',
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [chartData, setChartData] = useState(null);
    const [chartDetails, setChartDetails] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await axios({
                method: 'post',
                url: 'https://mdisinntbif4csncmqi2e56dte0ntupn.lambda-url.eu-central-1.on.aws/mvp/calculate',
                data: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);

            setChartData({ "allocated shares": response.data.number_of_allocated_shares - response.data.vested_shares, "vested shares": response.data.vested_shares });
            setModalIsOpen(true);

            setChartDetails({
                companyName: formData.companyName,
                status: response.data.note,
                agreementStartDate: response.data.start_date,
                currentDate: response.data.current_date,
                numberOfAllocatedShares: response.data.number_of_allocated_shares,
                numberOfVestedShares: response.data.vested_shares,
            });
        } catch (error) {
            console.error(error);
        }
    };


    const customStyles = {
        content: {
            width: '50%', // adjust as needed
            height: '50%', // adjust as needed
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative', // for absolute positioning of close button
        },
        closeButton: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '1.5em',
            cursor: 'pointer',
        },
        chartDetails: {
            width: '70%', // adjust as needed
            height: '70%', // adjust as needed
            margin: 'auto',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '20px',
        },
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50px',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
        boxShadow: '0px 0px 15px -10px rgba(0,0,0,0.75)',
    };

    const inputStyle = {
        margin: '10px 0',
        padding: '10px',
        width: '100%',
        borderRadius: '4px',
        border: '1px solid #ced4da',
    };

    const labelStyle = {
        fontWeight: 'bold',
        marginBottom: '5px',
    };

    const buttonStyle = {
        padding: '10px 20px',
        marginTop: '20px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // This makes the container fill the viewport
    };
    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <label for="agreementStartDate" style={labelStyle}>Agreement Start Date:</label>

                <input
                    type="date"
                    name="agreementStartDate"
                    value={formData.agreementStartDate}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="the start date of the agreement"
                />
                <label for="numberOfAllocatedShares" style={labelStyle}>Number of Allocated Shares:</label>

                <input
                    type="number"
                    name="numberOfAllocatedShares"
                    value={formData.numberOfAllocatedShares}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="the number of allocated shares"

                />
                <label for="cliffPeriod" style={labelStyle}>Cliff Period:</label>

                <input
                    type="number"
                    name="cliffPeriod"
                    value={formData.cliffPeriod}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="the cliff period in months"
                />
                <label for="vestingPeriod" style={labelStyle}>Vesting Period:</label>
                <input
                    type="number"
                    name="vestingPeriod"
                    value={formData.vestingPeriod}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="the vesting period in months"
                />
                <label for="vestingPercentage" style={labelStyle}>Vesting Percentage:</label>
                <input
                    type="number"
                    name="vestingPercentage"
                    value={formData.vestingPercentage}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="the vesting percentage per vesting period"
                />
                <button type="submit" style={buttonStyle}>Submit</button>
            </form>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}>
                <button style={customStyles.closeButton} onClick={() => setModalIsOpen(false)}>
                    <AiOutlineClose /> {/* use close icon */}
                </button>
                <div style={customStyles.chartDetails}>

                    <PieChart data={chartData} />

                    <div style={customStyles.details}>
                        <h2>Agreement Details:</h2>
                        <div>
                            <p>Company Name: {chartDetails?.companyName}</p>
                            <p>Status: {chartDetails?.status}</p>
                            <p>Agreement Start Date: {chartDetails?.agreementStartDate}</p>
                            <p>Current Date: {chartDetails?.currentDate}</p>
                            <p>Number of Allocated Shares: {chartDetails?.numberOfAllocatedShares}</p>
                            <p>Number of Vested Shares: {chartDetails?.numberOfVestedShares}</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>

    );
};

export default MyForm;