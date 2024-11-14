const getBankDetails = async (ifscCode) => {
    const fetch = (await import('node-fetch')).default; // Dynamic import

    try {
        const response = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Bank Name: ${data.bank_name}`);
        console.log(`IFSC Code: ${data.ifsc}`);
        console.log(`Branch: ${data.branch}`);
    } catch (error) {
        console.error('Error fetching bank details:', error.message);
    }
};

// Replace with the desired IFSC code
getBankDetails('SBIN0000032');
