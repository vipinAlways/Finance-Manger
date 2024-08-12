import React, { useState } from 'react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

function PostAmount() {
    const [amount, setAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { toast } = useToast();

    const handleSubmit = async (event : React.FormEvent) => {
        event.preventDefault();

        if (!amount || !startDate) {
            toast({
                title: "Amount and From are required",
                description: "If 'to' is empty, by default it will be 1 month."
            });
            return;
        }

        try {
            const response = await fetch("/api/post-amount", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount, startDate, endDate })
            });
            const data = await response.json();

            if (data.ok) {
                setAmount('');
                setStartDate('');
                setEndDate('');
                alert("Budget has been submited")
                window.location.reload();
            } else {
                toast({
                    title: "Error",
                    description: "Failed to post the amount. Please try again."
                });
            }
        } catch (error) {
            console.error("Error in try while posting amount:", error);
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again."
            });
        }
    };

    return (
        <div className='mt-4'>
            <form
                onSubmit={handleSubmit}
                className='w-1/2 mx-auto my-auto flex flex-col items-center h-[50vh] justify-around px-2 border-2 bg-gradient-to-r  from-green-800 via-green-300 to-green-500  rounded-lg' 
            >
             <div className='flex flex-col items-center gap-2'>
                <label htmlFor="amount" className='lg:text-xl max-md:text-lg max-sm:text-sm'>Budget For duration</label>
             <input
                    type="number"
                    name='amount'
                    id="amount"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    className='border w-1/2 p-2 lg:text-xl max-md:text-lg max-sm:text-sm font-semibold rounded-md bg-zinc-300 text-green-400'
                />
             </div>
                <div className='flex justify-evenly w-full'>
                    <div className='flex flex-col items-center gap-2'>
                        <label className='text-white lg:text-xl max-md:text-lg max-sm:text-sm' htmlFor="startDate">From</label>
                        <input
                            className='border p-2 rounded-lg bg-green-600 text-white'
                            type="date"
                            name='startDate'
                            id='startDate'
                            onChange={(e) => setStartDate(e.target.value)}
                            value={startDate}
                        />
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <label className='text-white lg:text-xl max-md:text-lg max-sm:text-sm' htmlFor="endDate">To</label>
                        <input
                            className='border p-2 rounded-lg bg-green-600 text-white'
                            type="date"
                            name='endDate'
                            id='endDate'
                            onChange={(e) => setEndDate(e.target.value)}
                            value={endDate}
                        />
                    </div>
                </div>
                <Button type='submit' className='lg:text-xl max-md:text-lg max-sm:text-sm'>Submit</Button>
            </form>
        </div>
    );
}

export default PostAmount;
