import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css';
import api from '../../services/api';

 export interface Teacher {
    id: number,
    name: string,
    avatar: string,
    bio: string,
    cost: number,
    subject:string,
    whatsapp:string
 }
 interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC <TeacherItemProps> =({teacher}) =>{
    
    function createNewConnection(){
        api.post('connections',{
            user_id: teacher.id,
        });
    }
    
    return(

        <article className="teacher-item">
        <header>
            <img src="data:image/jpeg;base64,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" alt=""/>
          <div>
            <strong>{teacher.name}</strong>
            <span>{teacher.subject}</span>
          </div>
        </header>

        <p>
            {teacher.bio}
            <br /><br />
        </p>

        <footer>
            <p>
                Preço/hora
                <strong>R$ {teacher.cost}</strong>
            </p>
           
              <a 
              onClick={createNewConnection} 
              target="_blank"
              rel="noopener noreferrer"
              href={`https://wa.me/${teacher.whatsapp}`}>
                <img src={whatsappIcon} alt="Whatsapp"/>
                Entrar em contato
            </a>
        </footer>
    </article>
    )
}

export default TeacherItem;