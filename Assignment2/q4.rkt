#lang racket
(provide (all-defined-out))

; Signature: shift-left(list)
; Purpose: takes a list as an argument and evaluates the list that is its’ shift-left by one place.
; Type: [List(any) -> List(any)]
; Example: (shift-left '(1 (2 3) 4)) should produce '((2 3) 4 1)
; Pre-conditions: none
; Post-condition: none
; Tests:
;> (shift-left '())
;'()
;> (shift-left '(5))
;'(5)
;> (shift-left '(1 2))
;'(2 1)
;> (shift-left '(1 2 3 4))
;'(2 3 4 1)
;> (shift-left '(1 (2 3) 4))
;'((2 3) 4 1)

(define shift-left
  (lambda (ls)
    (if (empty? ls)
        '()
      (append (cdr ls) (cons (car ls) '()))
    )
  )
 )

; Signature: shift-k-left(list,k)
; Purpose: takes a list and a number k ≥ 0 and evaluates the list that is the given list’s shift-left k times.
; Type: [List(any)*Number -> List(any)]
; Example: (shift-k-left '(1 2 3) 2) should produce '(3 1 2)
; Pre-conditions: k>=0
; Post-condition: none
; Tests:
;> (shift-k-left '() 5)
;'()
;> (shift-k-left '(1) 100)
;'(1)
;> (shift-k-left '(1 2 3) 0)
;'(1 2 3)
;> (shift-k-left '(1 2 3) 1)
;'(2 3 1)
;> (shift-k-left '(1 2 3) 2)
;'(3 1 2)
;> (shift-k-left '(1 2 3) 3)
;'(1 2 3)
(define shift-k-left
  (lambda (ls k)
    (if (= k 0)
        ls
    (shift-k-left (shift-left ls) (- k 1))
    )
  )
)

; Signature: shift-right(list)
; Purpose: takes a list and evaluates the list that is the given list’s shift-right one time.
; Type: [List(any) -> List(any)]
; Example: (shift-right '(3 1 2)) should produce '(2 3 1)
; Pre-conditions: none
; Post-condition: none
; Tests:
;> (shift-right '())
;'()
;> (shift-right '(1))
;'(1)
;> (shift-right '(1 2 3))
;'(3 1 2)
;> (shift-right '(3 1 2))
;'(2 3 1)
(define shift-right
  (lambda (ls)
    (if (empty? ls)
        '()
      (append ( cons(last ls) '()) (take  ls (- (length ls) 1)))
     )
  )
)


; Signature: combine(list1,list2)
; Purpose: takes two lists and combines them in an alternating manner
;          starting from the first list. If one of the lists is empty,
;          then the result of combine is the other list.
; Type: [List(any)*List(any) -> List(any)]
; Example: (combine '(1 2 3 4) '(5 6)) should produce '(1 5 2 6 3 4)
; Pre-conditions: none
; Post-condition: none
; Tests:
;> (combine '() '())
;’()
;> (combine '(1 2 3) '())
;'(1 2 3)
;> (combine '() '(4 5 6))
;'(4 5 6)
;> (combine '(1 3) '(2 4))
;'(1 2 3 4)
;> (combine '(1 3) '(2 4 5 6))
;'(1 2 3 4 5 6)
;> (combine '(1 2 3 4) '(5 6))
;'(1 5 2 6 3 4)
(define combine
  (lambda (ls1 ls2)
   (if (empty? ls1)
        (if (empty? ls2)
            '()
            ls2)
        (if (empty? ls2)
            ls1
           (append (cons(car ls1) '()) (cons(car ls2) '()) (combine (cdr ls1) (cdr ls2)))
        )
    )
  )
)

; Signature: sum-tree(tree)
; Purpose: receives a tree whose nodes’ data values
;          are all numbers ≥ 0 and returns the sum of numbers
;          present in all tree nodes.
; Type: [Tree(Number) -> Number]
; Example: > (sum-tree ’(5 (1 (2) (3 (12) (12)) (6)) (7))) should produce 48
; Pre-conditions: nodes’ data values
;                         are all numbers ≥ 0
; Post-condition: result = none
; Tests:
;> (sum-tree '())
;0
;> (sum-tree '(5))
;5
;> (sum-tree '(5 (1 (2) (3))))
;7
;11
;> (sum-tree '(5 (1 (2) (3) (6)) (7)))
;24
;> (sum-tree '(5 (1 (2) (3 (12) (12)) (6)) (7)))
;48
(define sum-tree
  (lambda (tree)
    (foldl + 0 (flatten tree))
   )
)

; Signature: inverse-tree(tree)
; Purpose: receives a tree whose nodes data values are numbers and booleans and returns the equivalent
;          tree whose nodes satisfy the following:
;          • If the equivalent node of the original tree is a number, then the resulting
;            tree’s node is -1· that node value
;          • If the equivalent node of the original tree is a boolean, then the resulting
;            tree’s node is the logical not of that node value
; Type: [Tree(Number|Boolean) -> Tree(Number|Boolean)]
; Example: > (inverse-tree '(-5 (1 (-2) (3) (#f)) (#t))) should produce '(5 (-1 (2) (-3) (#t)) (#f))
; Pre-conditions: none
; Post-condition: none
; Tests:
;> (inverse-tree '())
;'()
;> (inverse-tree '(5))
;'(-5)
;> (inverse-tree '(0))
;'(0)
;> (inverse-tree '(#f))
;'(#t)
;> (inverse-tree '(#t))
;'(#f)
;> (inverse-tree '(-5 (1 (-2) (3) (#f)) (#t)))
;'(5 (-1 (2) (-3) (#t)) (#f))
(define inverse-tree
  (lambda (tree)
    (map (lambda (x)
           (if (number? x)
               (* x -1)
               (if (boolean? x)
                   (not x)
                   (if(empty? x)
                      '()
                      (inverse-tree x)
                   )
                )
           )
           ) tree)
  )
)