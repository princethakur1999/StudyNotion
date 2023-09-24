import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from 'react-icons/rx'
import { MdModeEditOutline, MdDelete } from 'react-icons/md'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { MdAdd } from 'react-icons/md'
import ConfirmationModal from '../../../common/ConfirmationModal'
import SubSectionModal from './SubSectionModal';
import {deleteSection, deleteSubSection} from '../../../../services/operations/courseDetailsAPI'
import {setCourse} from '../../../../slices/courseSlice'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//


function NestedView({ handleChangeEditSectionName }) {
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null)

    

    async function handleDeleteSection(sectionId) {
        const result=await deleteSection({
            sectionId,
            courseId:course._id},
            token
        )
        if(result){
            dispatch(setCourse(result))
            
        }
        setConfirmationModal(null)
    }

    async function handleDeleteSubSection(subSectionId, sectionId) {
        // console.log('subSectionId:',subSectionId)
        // console.log('sectionId:',sectionId)
        
        const result = await deleteSubSection({courseId:course._id,subSectionId,sectionId,token});
        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null)
    }



    return (
        <>
            <div className={`bg-richblack-600 ${course.courseContent.length===0?'hidden':'py-2 px-5 border-[1px] border-richblack-200 '}  rounded-lg `}>
                {
                    course.courseContent.map((section) => (
                        <details key={section._id} className='group '>
                            <summary className='flex justify-between cursor-pointer py-2 group-open:border-b-[1px] group-open:border-richblack-400'>
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    <RxDropdownMenu className='text-2xl text-richblack-100 ' />
                                    <p className='text-richblack-25 font-semibold'>
                                        {section.sectionName}
                                    </p>
                                </div>

                                <div className='flex gap-2 items-center text-xl text-richblack-100'>
                                    <MdModeEditOutline
                                    className='hover:text-richblack-800 hover:rotate-[15deg] transition-all '
                                        onClick={() => handleChangeEditSectionName(section._id, section.sectionName)} />
                                    <MdDelete
                                    className='hover:text-pink-400 transition-colors'
                                        onClick={(e) => {
                                            setConfirmationModal({
                                                text1: 'Delete this Section?',
                                                text2: 'All Lectures in this section will be deleted',
                                                btn1Text: 'Delete',
                                                btn2Text: 'Cancle',
                                                btn1Handler: () => handleDeleteSection(section._id),
                                                btn2Handler: () => setConfirmationModal(null)
                                            })
                                        }}
                                    />
                                    <div className='h-[85%] w-[0.025rem] rounded-full bg-richblack-100'></div>
                                    <AiOutlineCaretDown className='text-lg group-open:rotate-180 transition-all' />
                                </div>

                            </summary>
                            {section.subSection.map((data) => (
                                <div className='flex justify-between'>
                                <div
                                    key={data._id}
                                    onClick={() =>{ 
                                        console.log('data :',data)
                                        setViewSubSection(data)}}
                                    className='text-richblack-25 text-sm font-medium py-2 ml-5 flex border-b-[1px] border-richblack-400 flex-1'>
                                    <div className='flex items-center gap-2 cursor-pointer '>
                                        <RxDropdownMenu className='text-xl text-richblack-100 ' />
                                        <p>{data.title}</p>
                                    </div>

                                    

                                </div>
                                <div className='flex gap-2 items-center text-xl text-richblack-100 border-b-[1px] border-richblack-400'>
                                        <MdModeEditOutline
                                            className='cursor-pointer hover:text-richblack-800 hover:rotate-[15deg] transition-all'
                                            onClick={() =>setEditSubSection({ ...data, sectionId: section._id })}
                                        />
                                        <MdDelete
                                            className='cursor-pointer hover:text-pink-400 transition-colors'
                                            onClick={() => {
                                                setConfirmationModal({
                                                    text1: 'Delete this Lecture?',
                                                    text2: 'Selected lecture will be deleted',
                                                    btn1Text: 'Delete',
                                                    btn2Text: 'Cancle',
                                                    btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: () => setConfirmationModal(null)
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                                
                            ))}
                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className='flex items-center gap-2 text-yellow-50 font-medium py-2 ml-5 hover:scale-[1.1] transition-all '>
                                <MdAdd className='text-xl hover:rotate-180 transition-all' />
                                <p>Add Lecture</p>
                            </button>
                        </details>
                    ))
                }
            </div>
            {
                addSubSection?(<SubSectionModal
                    modalData={addSubSection}
                    setModalData={setAddSubSection}
                    add={true}
                />):
                viewSubSection?(<SubSectionModal
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    view={true}
                />):
                editSubSection?(<SubSectionModal
                    modalData={editSubSection}
                    setModalData={setEditSubSection}
                    edit={true}
                />):
                (null)
            }
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>


    )
}

export default NestedView
