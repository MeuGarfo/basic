#!/bin/bash
php=`which php`

dropAll()
{
	touch offline
	clear
	echo "apagando tabelas..."
	$php bin/dropAll.php
	rm offline
}

cloneApp()
{
	touch offline
	clear
	echo "apagando app..."
	rm -rf app
	clear
	echo "Digite o repositório do app:"
	read app
	git clone $app app
	echo "app clonado com successo."
	rm offline
}

migrateAll()
{
	touch offline
	clear
	echo "migrando sistema..."
	$php bin/migrateAll.php
	echo "migração concluída."
	rm offline
}

truncateAll()
{
	touch offline
	clear
	echo "limpando tabelas..."
	$php bin/truncateAll.php
	rm offline
}

clear

if [ -z "$1" ]
	then
		echo "Digite a opção:"
		echo "1) migrar todas as tabelas (default)"
		echo "2) limpar todas as tabelas (truncate)"
		echo "3) apagar todas as tabelas (drop table)"
		echo "4) clonar app"
		printf "Opção número "
		read opt
	else
		opt=$1
fi

case $opt
in
	1) migrateAll ;;
	2) truncateAll ;;
	3) dropAll ;;
	4) cloneApp ;;
	*) migrateAll ;;
esac
