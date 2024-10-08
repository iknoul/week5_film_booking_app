'use client'
import axios from '../../../utils/axios'

import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { Alert, Spin } from 'antd';

import DashBoardCardContainer from '../components/DashBoardCardContainer/DashBoardCardContainer'
import AddData from '../components/AddData/AddData'

import PrivateRoute from '../../components/PrivateRouter'

import styles from './adminDashBoard.module.css'


const AdminDashBoard:React.FC = ()=>{

    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedItem, setSelectedItem] = useState({ item: '', purpose: '' });
    const {token} = useAuth()


    const callbackFunction = async(data?:object, item?:string, puprose?: string) =>{
        setLoading(true)
        if(data){

            switch(item){
                case "Theater":
                    if(puprose == 'add')
                    {
                        console.log('asas')
                        await makeNewTheater(data)
                    }
                    break;

                case "Movie":
                case "Movie manually":
                    if (puprose === 'add') {
                        await makeNewMovie(data);
                    }
                    break;
                        
                case "Show time":
                    if(puprose == "add")
                    {
                        console.log(data)
                        await makeNewShowTime(data)
                    }
                    break;

                default:
                    setSelectedItem({ item: '', purpose: '' })
                    break;          
            }
        }
        else{
            setSelectedItem({ item: '', purpose: '' })
        }
        setLoading(false)
    }

    const makeNewTheater = async(theater:object)=>{

        setLoading(true)

        try {
            const response = await axios.post('/admin/add-theater',
                {theater},
                {
                    headers: {
                      Authorization: `Bearer ${token}`, // Token from props
                    },
                }
            )
            await new Promise((resolve) => setTimeout(resolve, 5000));
    
            if(response?.status === 201){
                setSuccess(true)
                setSelectedItem({item:'', purpose:''})
                setTimeout(()=>{setSuccess(false)}, 5000)
            }
            else{
                setFail(true)
                setSelectedItem({item:'', purpose:''})
                setTimeout(()=>{setFail(false)}, 2500)
            }
        } catch (error) {
            setFail(true)
            setSelectedItem({item:'', purpose:''})
            setTimeout(()=>{setFail(false)}, 2500)
        }

        setLoading(false)
    }

    const makeNewMovie = async(movie:object) =>{

        setLoading(true)
        
        try {
            const response = await axios.post('/admin/add-movie',
                {movie},
                {
                    headers: {
                      Authorization: `Bearer ${token}`, // Token from props
                    },
                })
            await new Promise((resolve) => setTimeout(resolve, 5000));
    
            if(response?.status === 201){
                setSuccess(true)
                setSelectedItem({item:'', purpose:''})
                setTimeout(()=>{setSuccess(false)}, 5000)
            } else {
                setFail(true)
                setSelectedItem({item:'', purpose:''})
                setTimeout(()=>{setFail(false)}, 2500)
            }
        } catch (error) {
            setFail(true)
            setSelectedItem({item:'', purpose:''})
            setTimeout(()=>{setFail(false)}, 2500)
        }

        setLoading(false)
    }

    const makeNewShowTime = async(data:object) =>{

        setLoading(true)
     
        try {
            await axios.post('/admin/add-show-time', 
                {data},
                {
                    headers: {
                      Authorization: `Bearer ${token}`, // Token from props
                    },
                });

            setSuccess(true)
            setSelectedItem({item:'', purpose:''})
            setTimeout(()=>{setSuccess(false)}, 5000)
        } catch (error) {
            setFail(true)
            setSelectedItem({item:'', purpose:''})
            setTimeout(()=>{setFail(false)}, 2500)
            console.error('Error adding showtime:', error);
        }
        setLoading(false)
    }

    return(
        <PrivateRoute requiredRole='admin'>
            <div className={styles.adminDashBoard}>
                {success &&
                    <Alert message="Done" type="success" showIcon className={styles.alert}/>
                }
                {fail&&
                    <Alert message="Error" type="error" showIcon className={styles.alert}/>
                }
                  
                {selectedItem.item && (
                    <Spin spinning={loading}>
                        <AddData 
                            item={selectedItem.item}
                            purpose={selectedItem.purpose}
                            callbackFunction={callbackFunction}
                            // visible = {true}
                        />
                    </Spin>
                    
                )}
                <DashBoardCardContainer selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
            </div>
        </PrivateRoute>
    )
}

export default AdminDashBoard