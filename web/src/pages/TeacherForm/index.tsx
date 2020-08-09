import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

function TeacherForm(){

const history = useHistory();

const [name, setName] = useState('');
const [avatar, setAvatar] = useState('');
const [whatsapp, setWhatsapp] = useState('');
const [bio, setBio] = useState('');

const [subject, setSubject] = useState('');
const [cost, setCost] = useState('');

const [scheduleItems, setScheduleItems] = useState([
  {week_day: 0, from: "", to: ""}
]);


function addNewScheduleItems(){
  setScheduleItems([
    ...scheduleItems,
    {week_day: 0, from: "", to: ""}
  ]);
}

function setScheduleItemValue( position: number, field: string, value: string){
  const updateScheduleItems = scheduleItems.map( (scheduleItem, index) => {
    if (index === position){
      return {...scheduleItem, [field] : value}
    }
    return scheduleItem;
  });

  setScheduleItems(updateScheduleItems);
}

function handleCreateClasse(e: FormEvent){
  e.preventDefault();
  api.post('classes', {
    name,
    avatar,
    whatsapp,
    subject,
    bio,
    cost: Number(cost),
    schedule: scheduleItems
  }).then( () => {
    alert('Cadastro realizado com sucesso');
    history.push('/');
  }).catch(() => {
    alert(' Erro ao cadastrar');
  });
}

    return (
        <div id="page-teacher-form">
          <PageHeader 
          title="Que incrível que você quer dar aulas."  
          description="O primeiro passo é preencher o formulário de inscrição"
        />
        
      <main>
        <form onSubmit={handleCreateClasse}>
        <fieldset>
          <legend>Seus dados:</legend>
          
          <Input 
            name="name" 
            label="Nome completo" 
            value={name}
            onChange= {(e) => { setName(e.target.value)}}
          />
          <Input 
            name="avatar" 
            label="Avatar" 
            value={avatar}
            onChange= {(e) => { setAvatar(e.target.value)}}
         
          />
          <Input 
            name="whatsapp" 
            label="Whatsapp" 
            value={whatsapp}
            onChange= {(e) => { setWhatsapp(e.target.value)}}
         
          />
          <Textarea 
            name="bio" 
            label="Biografia" 
            value={bio}
            onChange= {(e) => { setBio(e.target.value)}}
         
          />

        </fieldset>

        <fieldset>
          <legend>Sobre a aula</legend>

          <Select
           name="subject" 
           label="Matéria" 
           value={subject}
           onChange= {(e) => { setSubject(e.target.value)}}
           options ={[
             {value: 'Artes', label: 'Artes'},
             {value: 'Biologia', label: 'Biologia'},
             {value: 'Matemática', label: 'Matemática'},
             {value: 'Português', label: 'Português'},
           ]}
           />

          <Input 
            name="cost" 
            label="Custo da sua hora por aula" 
            value={cost}
            onChange= {(e) => { setCost(e.target.value)}}
         
          />

        </fieldset>

           <fieldset>
             <legend>
                Horários disponíveis
                <button type="button" onClick={addNewScheduleItems}>
                  + Novo horário
                </button>
             </legend>
            
            {scheduleItems.map((scheduleItem, index) => {
              return (
                  <div key={index} className="schedule-item">
                      <Select
                          name="week_day" 
                          label="Dia da semana" 
                          value={scheduleItem.week_day}
                          onChange={ e => setScheduleItemValue(index,'week_day', e.target.value)}
                          options ={[
                             {value: '0', label: 'Domingo'},
                             {value: '1', label: 'Segunda-feira'},
                             {value: '2', label: 'Terça-feira'},
                             {value: '3', label: 'Quarta-feira'},
                             {value: '4', label: 'Quinta-feira'},
                             {value: '5', label: 'Sexta-feira'},
                             {value: '6', label: 'Sabádo'},
                          ]}
                    />
                    <Input 
                      name="from" 
                      label="Das" 
                      type="time" 
                      value={scheduleItem.from}
                      onChange={ e => setScheduleItemValue(index,'from', e.target.value)}
                    />

                    <Input 
                      name="to" 
                      label="Até" 
                      type="time"
                      value={scheduleItem.to}
                      onChange={ e => setScheduleItemValue(index,'to', e.target.value)}
                      
                    />
                  </div>
                   );
                }
              )}
           </fieldset>
         
        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante"/>
            Importante! <br />
            Preencha os dados
          </p>
          <button type="submit">
            Salvar cadastro
          </button>
        </footer> 
        </form>
      </main>

        </div>
    )
}

export default TeacherForm;