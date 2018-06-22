; --------------------------------------------------- Q 3 ------------------------------------------------------------

; --------------------------------------------------- Q 3.1 ------------------------------------------------------------


#lang racket

(define vowels '(a e i o u))

;; Signature: xIsSyllable?(letter,list)
;; Type:  (letter,List(String)) -> Boolean
;; Purpose: `count-syllables-help` takes a char and list of letters as its argument and returns #t if x is syllable or #f if x is not a syllable.
(define letterIsSyllable?
  (lambda (letter l)
    (if (empty? l)
        #f
        (if (equal? letter (car l)) 
            #t 
            (letterIsSyllable? letter (cdr l))
        )
     )
  )
)

;; Signature: count-syllables-help(flag,list)
;; Type:  (Number,List(String)) -> Number
;; Purpose: `count-syllables-help` takes a flag and list of letters as its argument and returns the number of syllables in the word formed by the letters, according to the following rule: 

;;           The number of syllables is the number of vowels, except that a group of consecutive vowels counts as one. 
;;           Vowels are the letters:

;;           ```
;;           (define vowels '(a e i o u))
;;           ```..
(define count-syllables-help
  (lambda (flag l)
    (if (empty? l)
        0
        (if (= flag 0)
            (if (letterIsSyllable? (car l) vowels)
                (+ 1 (count-syllables-help 1 (cdr l)))
                (+ 0 (count-syllables-help 0 (cdr l)))
            )
            (+ 0 (count-syllables-help 0 (cdr l)))
         )        
     )
   )
)

;; Signature: count-syllables(list)
;; Type: (List(String)) -> Number
;; Purpose: `count-syllables` takes a list of letters as its argument and returns the number of syllables in the word formed by the letters, according to the following rule: 

;;           The number of syllables is the number of vowels, except that a group of consecutive vowels counts as one. 
;;           Vowels are the letters:

;;           ```
;;           (define vowels '(a e i o u))
;;           ```.
(define count-syllables 
                    (lambda (list)
                            (count-syllables-help 0 list)
                    )
)

;; Signature: assert(list,number)
;; Type: (List(String),Number) -> Boolean
;; Purpose: `assert` takes a list of letters and a number as its argument and returns #t if count-syllables returns the number, and #f otherwise
(define assert
             (lambda(list number)
                (if(= (count-syllables list) number)
                   #t
                   #f
                 )
              )
)

;5 TESTS
(define list1 '(b e e p))
(define list2 '(b e e p e r))
(define list3 '(y o u))
(define list4 '(y o u g o u g e))
(define list5 '(g a m e))

(equal? (assert list1 1) #t)
(equal? (assert list2 2) #t)
(equal? (assert list3 1) #t)
(equal? (assert list4 3) #t)
(equal? (assert list5 2) #t)

; --------------------------------------------------- Q 3.2 ------------------------------------------------------------

#lang racket

;; Signature: sorted-help(operator,last,list)
;; Type: (operator,Number,List(Number)) -> Boolean
;; Purpose: takes as input an operator, a number and a list of numbers and returns true if the list is sorted according to the comparator argument.
(define sorted-help
  (lambda (operator last list)
                 (
                   if (empty? list)
                       #t
                       (if (operator last (car list))
                          (sorted-help operator (car list) (cdr list))
                           #f
                       )        
                  )
   )
)

;; Signature: sorted(list,operator)
;; Type: (List(Number),Char) -> Boolean
;; Purpose: takes as input a list of numbers and returns true if the list is sorted according to the comparator argument.
(define sorted? 
              (lambda (list operator)
                 (
                  if (empty? list)
                      #t
                      (sorted-help operator (car list) (cdr list))
                 )
              )
)

;; Signature: assert(list, operator, bool)
;; Type: (List(String),Char, Boolean) -> Boolean
;; Purpose: `assert` takes as input a list of numbers, operator and a boolean, and returns true #t if sorted? 
            returns true, and false otherwise
(define assert
             (lambda(list operator bool)
                (if(equal? (sorted? list operator) bool)
                   #t
                   #f
                 )
              )
)

;5 TESTS
(define list1 '(1 2 3 4))
(define list2 '(1 2 1))
(define list3 '(4 3 2 1))
(define list4 '(1 2 3 2 1))
(define list5 '(1 1 2 3 4 5 6 7 8))

(equal? (assert list1 < #t) #t)
(equal? (assert list2 < #f) #t)
(equal? (assert list3 > #t) #t)
(equal? (assert list4 < #f) #t)
(equal? (assert list5 < #f) #t)

; Answers for the second part of this question:
; 1. the procedure shoult return #t on an empty list, and that's becaues that there is no pair (a,b) at the list  
;    elements such that a comes before b in the list, but b<a (for whichever ordering '<' considered).
; 
; 2. the procedure shoult return #t on an '1 element' list, and that's becaues that there is no pair (a,b) at the list  
;    elements such that a comes before b in the list, but b<a (for whichever ordering '<' considered).


; --------------------------------------------------- Q 3.3 ------------------------------------------------------------


#lang racket

;; Signature: remove-adjacent-duplicates-help(last,list)
;; Type:  (T,List(T)) -> List(T)
;; Purpose: takes the last T and a list as input and returns as value the same list with any sequence of repeated elements reduced to a single element
(define remove-adjacent-duplicates-help
  (lambda (last list)
                 (
                   if (empty? list)
                       (cons last '())
                       (if (not (equal? last (car list)))
                          (cons last (remove-adjacent-duplicates-help (car list) (cdr list)))
                          (remove-adjacent-duplicates-help (car list) (cdr list))
                       )        
                  )
   )
)

;; Signature: remove-adjacent-duplicates(list)
;; Type:  (List(T)) -> List(T)]
;; Purpose: takes a list as input and returns as value the same list with any sequence of repeated elements reduced to a single element
(define remove-adjacent-duplicates
              (lambda (list)
                 (
                  if (empty? list)
                      '()
                      (remove-adjacent-duplicates-help (car list) (cdr list))
                 )
              )
)

;; Signature: sorted-help(operator,last,list)
;; Type: (operator,Number,List(Number)) -> Boolean
;; Purpose: takes as input an operator, a number and a list of numbers and returns true if the list is sorted according to the comparator argument
(define sorted-help
  (lambda (operator last l)
                 (
                   if (empty? l)
                       #t
                       (if (operator last (car l))
                          (sorted-help operator (car l) (cdr l))
                           #f
                       )        
                  )
   )
)

;; Signature: sorted?(list,operator)
;; Type: (List(Number),operator) -> Boolean
;; Purpose: takes as input a list of numbers and returns true if the list is sorted according to the comparator argument.
(define sorted? 
              (lambda (list operator)
                 (
                  if (empty? list)
                      #t
                      (sorted-help operator (car list) (cdr list))
                 )
              )
)

;; Signature: merge(list1,list2)
;; Type: (List(Number),List(Number)) -> Boolean
;; Purpose: takes two lists of numbers as input.
;;          Each list must be a sorted list of numbers in increasing order. 
;;          Merge must return a list containing all of the numbers, in increasing order.
;;          `merge` tests its pre-conditions and throw an error if they are not met.
(define merge 
              (lambda (list1 list2)
                 (
                  if (not (sorted? list1 <))
                    (if (not (sorted? list2 <))
                         (error "both lists not sorted")
                         (error "first list not sorted")
                    )
                    (if(not (sorted? list2 <))
                       (error "second list not sorted")
                       (if (empty? list1)
                           (if (empty? list2)
                               '()
                               list2)
                           (if (empty? list2)
                               list1
                               (if (< (car list1) (car list2))
                                   (remove-adjacent-duplicates(cons (car list1) (merge (cdr list1) list2)))
                                   (remove-adjacent-duplicates(cons (car list2) (merge list1 (cdr list2))))    
                               )
                           )
                        )
                    )
                )
            )
)

;; Signature: assert(list1,list2,mergedList)
;; Type: (List(Number),List(Number),List(Number)) -> Boolean
;; Purpose: `assert` takes 3 lists of numbers as its argument and returns #t if merge(list1,list2) returns the mergedList, and #f otherwise
(define assert
             (lambda(list1 list2 mergedList)
                (if(equal? (merge list1 list2) mergedList)
                   #t
                   #f
                 )
             )
)

;5 TESTS
(define test1list1 '(1 4 5 7))
(define test1list2 '(2 4 6 8))
(define test1MergedList '(1 2 4 5 6 7 8))

(define test2list1 '(1 2 3 5))
(define test2list2 '(4 6 7 8))
(define test2MergedList '(1 2 3 4 5 6 7 8))

(define test3list1 '(1 5 6 7))
(define test3list2 '(2 3 4 8))
(define test3MergedList '(1 2 3 4 5 6 7 8))

(define test4list1 '(1 2 3 4))
(define test4list2 '(5 6 7 8))
(define test4MergedList '(1 2 3 4 5 6 7 8))

(define test5list1 '(1 3 5 7))
(define test5list2 '(2 4 6 8))
(define test5MergedList '(1 2 3 4 5 6 7 8))

(equal? (assert test1list1 test1list2 test1MergedList) #t)
(equal? (assert test2list1 test2list2 test2MergedList) #t)
(equal? (assert test3list1 test3list2 test3MergedList) #t)
(equal? (assert test4list1 test4list2 test4MergedList) #t)
(equal? (assert test5list1 test5list2 test5MergedList) #t)


; --------------------------------------------------- Q 3.4 ------------------------------------------------------------


#lang racket

;; Signature: remove-adjacent-duplicates-help(last,list)
;; Type:  (T,List(T)) -> List(T)
;; Purpose: takes the last T and a list as input and returns as value the same list with any sequence of repeated elements reduced to a single element
(define remove-adjacent-duplicates-help
  (lambda (last list)
                 (
                   if (empty? list)
                       (cons last '())
                       (if (not (equal? last (car list)))
                          (cons last (remove-adjacent-duplicates-help (car list) (cdr list)))
                          (remove-adjacent-duplicates-help (car list) (cdr list))
                       )        
                  )
   )
)

;; Signature: remove-adjacent-duplicates(list)
;; Type:  (List(T)) -> List(T)]
;; Purpose: takes a list as input and returns as value the same list with any sequence of repeated elements reduced to a single element
(define remove-adjacent-duplicates
              (lambda (list)
                 (
                  if (empty? list)
                      '()
                      (remove-adjacent-duplicates-help (car list) (cdr list))
                 )
              )
)

;; Signature: assert(list,removedAdjList)
;; Type: (List(T),List(T)) -> Boolean
;; Purpose: `assert` takes 2 lists of T's as its argument and returns #t if removedAdjList(list) returns the removedAdjList, and #f otherwise
(define assert
             (lambda(list removedAdjList)
                (if(equal? (remove-adjacent-duplicates list) removedAdjList)
                   #t
                   #f
                 )
             )
)

;5 TESTS
(define test1que '(a b c c c d e f f f f f g g h i i j))
(define test2que '(1 2 3 3 4 4 5 5 6 7 8 8 9 10 10))
(define test3que '(#t #t #f #f #t #f #t #t))
(define test4que '(y a b b b b b b b a d a b b a d o o))
(define test5que '(yeah yeah yeah))

(define test1ans '(a b c d e f g h i j))
(define test2ans '(1 2 3 4 5 6 7 8 9 10))
(define test3ans '(#t #f #t #f #t))
(define test4ans '(y a b a d a b a d o))
(define test5ans '(yeah))

(equal? (assert test1que test1ans) #t)
(equal? (assert test2que test2ans) #t)
(equal? (assert test3que test3ans) #t)
(equal? (assert test4que test4ans) #t)
(equal? (assert test5que test5ans) #t)