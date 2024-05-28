create database db_acmefilmes;

use db_acmefilmes;

create table tbl_classificacao
(
	id integer primary key auto_increment not null,
	sigla varchar(2) not null,
    icone varchar(200) not null,
    descricao varchar(200) not null
);

create table tbl_filme
(
	id integer primary key auto_increment not null,
    nome varchar(100) not null,
    sinopse text not null,
    duracao time not null,
    data_lancamento date not null,
    data_relancamento date,
    foto_capa varchar(200) not null,
    link_trailer varchar(200) not null,
    
    id_classificacao integer not null,
    
    unique index (id),
    unique key (id),
    
    foreign key (id_classificacao) references tbl_classificacao(id)
);

create table tbl_genero
(
	id integer primary key auto_increment not null,
	nome varchar(50) not null
);

create table tbl_filmes_genero
(
	id integer primary key auto_increment not null,
    id_genero integer not null,
    id_filme integer not null,
    
    foreign key (id_genero) references tbl_genero(id),
    foreign key (id_filme) references tbl_filme(id)
);

create table tbl_filmes_atores
(
	id integer primary key auto_increment not null,
    id_filme integer not null,
    id_ator integer not null,
    
    foreign key (id_filme) references tbl_filme(id),
    foreign key (id_ator) references tbl_atores(id)
);

create table tbl_sexo
(
	id integer primary key auto_increment not null,
    nome varchar(20) not null,
    sigla varchar(2) not null
);

create table tbl_atores
(
	id integer primary key auto_increment not null,
    nome varchar(200) not null,
    data_nascimento date not null,
    data_falecimento date,
    biografia text not null,
    id_sexo integer not null,
    
    foreign key (id_sexo) references tbl_sexo(id)
);

create table tbl_atores_nacionalidade
(
	id integer primary key auto_increment not null,
    id_atores integer not null,
    id_nacionalidade integer not null,
    
    foreign key (id_atores) references tbl_atores(id),
    foreign key (id_nacionalidade) references tbl_nacionalidade(id)
);

create table tbl_nacionalidade
(
	id integer primary key auto_increment not null,
    nome varchar(50) not null
);

create table tbl_diretores
(
	id integer primary key auto_increment not null,
    nome varchar(200) not null
);

create table tbl_filmes_diretores 
(
	id integer primary key auto_increment not null,
    id_filme integer,
    id_diretor integer,
    
    foreign key (id_filme) references tbl_filme (id),
    foreign key (id_diretor) references tbl_diretores(id)
);


DELIMITER $
create trigger tgr_del_ator
	before delete on tbl_atores
		for each row
        begin 
			delete from tbl_atores_nacionalidade WHERE id_atores = old.id;
			delete from tbl_filmes_atores WHERE id_ator = old.id;
        end $
DELIMITER ;

select * from tbl_diretores;

-- POST
insert into tbl_classificacao(sigla, icone, descricao)values
("L", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/DJCTQ_-_L.svg/75px-DJCTQ_-_L.svg.png", " é possível a presença de armas sem violência, morte não violentas, ou violência fantasiosa, como acontece em desenhos animados. Tratando-se de nudez, são permitidas cenas não erotizadas. Por fim, pode ser exibido consumo moderado ou insinuado de droga lícita."),
("10", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/DJCTQ_-_10.svg/75px-DJCTQ_-_10.svg.png", " pode conter conteúdos angustiantes, de medo ou tensão, arma com violência, ato criminoso sem violência, linguagem depreciativa e ossada ou esqueleto com resquício de ato de violência. Conteúdo educativo sobre sexo e descrição do consumo de droga lícita, discussão sobre o tema droga e uso medicinal de droga ilícita, também é possível."),
("12", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/DJCTQ_-_12.svg/75px-DJCTQ_-_12.svg.png", "pode conter agressão verbal, assédio sexual, ato violento e ato violento contra animal, bullying, descrição de violência, exposição ao perigo, exposição a cadáver, exposição de pessoa em situação constrangedora ou degradante, lesão corporal, morte derivada de ato heroico, morte natural ou acidental com dor ou violência, obscenidade, presença de sangue, sofrimento da vítima, supervalorização da beleza física e do consumo e violência psicológica. É permitido mostrar apelo, carícia ou, insinuação sexual, linguagem chula ou de conteúdo sexual, masturbação, nudez velada e simulação de sexo. As produções podem exibir consumo de droga lícita ou irregular de medicamento, discussão sobre legalização de droga ilícita e indução ao uso ou menção a droga ilícita."),
("14", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/DJCTQ_-_14.svg/75px-DJCTQ_-_14.svg.png", "é possível ver cenas de aborto, estigma ou preconceito, eutanásia, exploração sexual, morte intencional e pena de morte. É permitida nudez, prostituição, relação sexual e vulgaridade. Quanto a drogas, as produções podem mostrar o consumo insinuado ou descrição do consumo ou tráfico de droga ilícita."),
("16", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/DJCTQ_-_16.svg/75px-DJCTQ_-_16.svg.png", "pode apresentar atos de pedofilia, crime de ódio, estupro ou coação sexual, mutilação, suicídio, tortura e violência gratuita ou banalização da violência. Conteúdos com consumo, indução e produção ou tráfico de droga ilícita, também são permitidos."),
("18", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/DJCTQ_-_18.svg/75px-DJCTQ_-_18.svg.png", "conteúdo exclusivamente destinado a adultos, sendo possível veicular apologia à violência e crueldade, sexo explícito, situação sexual complexa ou de forte impacto, e apologia ao uso de droga ilícita.");

insert into tbl_diretores(nome) values
("Martin Scorsese"),
("Tim Burton"),
("Steven Spielberg");

insert into tbl_genero(nome)values
("Comédia"),
("Romance"),
("Drama"),
("Comédia romântica"),
("Documentário"),
("Ação"),
("Ficção científica"),
("Musical"),
("Terror"),
("Infantil"),
("Aventura"),
("Faroeste");
("Mistério");
("Suspense");

insert into tbl_filmes_genero (id_genero, id_filme)values
(2, 20);                                

-- GET
select * from tbl_filme where nome like '%be%';
select * from tbl_filme;
select * from tbl_atores;
select * from tbl_sexo;
select id, nome from tbl_filme;
select id, nome from tbl_genero;

select * from tbl_diretores where nome like '%g%';

-- DELETE
delete from tbl_filme where id = 1;

-- PUT
update tbl_filme set  
					nome = "Como Perder um Homem em 10 Dias",
					sinopse = "Ben é um publicitário que aposta com o chefe que faz qualquer mulher se apaixonar por ele em dez dias. Se conseguir, será o responsável por uma cobiçada campanha de diamantes. Andie é uma jornalista que, por causa de uma matéria, está decidida a infernizar a vida de qualquer homem que se aproximar. Os dois se conhecem em um bar e escolhem um ao outro como alvo de seus planos totalmente opostos.",
					duracao = "01h50",
					data_lancamento = "2003-01-27",
					data_relancamento = "",
					foto_capa = "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/01/04/19871068.jpg",
					valor_unitario = 23

					where id = 20;