import React from 'react'

function Register() {
  return (
    <div className='container py-5'>
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <div className='bg-white p-5 rounded'>
                    <h2 className='text-center mb-4'>Sign up</h2>
                    <form>
                        <div className='mb-3'>
                            <label htmlFor="name" className='mb-1'><strong>Name</strong></label>
                            <input type="text" placeholder='Enter Name' name='name' 
                            className='form-control rounded-0' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="email" className='mb-1'><strong>Email</strong></label>
                            <input type="email" placeholder='Enter Email' name='email' 
                            className='form-control rounded-0' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password" className='mb-1'><strong>Password</strong></label>
                            <input type="password" placeholder='Enter Password' name='password' 
                            className='form-control rounded-0' />
                        </div>
                        <button type='submit' className='btn btn-success w-100 rounded-0 mt-3'>Sign up</button>
                        <p className='mt-2 mb-3'>You are agree to our terms and policies</p>
                    </form>
                </div>
            </div>
        </div>
    </div>

    
    // <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    //     <div className='bg-white p-5 rounded'>
    //         <h2 className='mb-4'>Sign Up</h2>
    //         <form>
    //             <div className='mb-3'>
    //                 <label htmlFor="name" className='mb-1'><strong>Name</strong></label>
    //                 <input type="text" placeholder='Enter Name' name='name' 
    //                 className='form-control rounded-0' />
    //             </div>
    //             <div className='mb-3'>
    //                 <label htmlFor="email" className='mb-1'><strong>Email</strong></label>
    //                 <input type="email" placeholder='Enter Email' name='email' 
    //                 className='form-control rounded-0' />
    //             </div>
    //             <div className='mb-3'>
    //                 <label htmlFor="password" className='mb-1'><strong>Password</strong></label>
    //                 <input type="password" placeholder='Enter Password' name='password' 
    //                 className='form-control rounded-0' />
    //             </div>
    //             <button type='submit' className='btn btn-success w-100 rounded-0'> Sign up</button>
    //             <p>You are agree to our terms and policies</p>
    //             <button className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'></button>
    //         </form>
    //     </div>
    // </div>
  )
}

export default Register