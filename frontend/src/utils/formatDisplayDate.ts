import { format } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"



export const formatDisplayDate = (start: Date, end: Date) => {
    return format(start, "d ' de 'LLL", { locale: ptBR }).concat(' até ').concat(format(end, "d ' de 'LLL", { locale: ptBR }))
}