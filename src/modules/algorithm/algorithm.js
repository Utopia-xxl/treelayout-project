function setExtremes(tree) {
  if (tree.cs === 0) {
    tree.el = tree
    tree.er = tree
    tree.msel = tree.mser = 0
    tree.dl = tree
    tree.dr = tree
  } else {
    tree.el = tree.c[0].el
    tree.msel = tree.c[0].msel
    tree.er = tree.c[tree.cs - 1].er
    tree.mser = tree.c[tree.cs - 1].mser
  }
}

function bottom(tree) {
  return tree.y + tree.h
}

/* A linked list of the indexes of left siblings and their lowest vertical coordinate.
 */
class IYL {
  constructor(lowY, index, next) {
    this.lowY = lowY
    this.index = index
    this.next = next
  }
}

function updateIYL(minY, i, ih) {
  // Remove siblings that are hidden by the new subtree.
  while (ih !== null && minY >= ih.lowY) {
    // Prepend the new subtree
    ih = ih.next
  }
  return new IYL(minY, i, ih)
}

function distributeExtra(tree, i, si, distance) {
  // Are there intermediate children?
  if (si !== i - 1) {
    const nr = i - si
    tree.c[si + 1].shift += distance / nr
    tree.c[i].shift -= distance / nr
    tree.c[i].change -= distance - distance / nr
  }
}

function moveSubtree(tree, i, si, distance) {
  // Move subtree by changing mod.
  tree.c[i].mod += distance
  tree.c[i].msel += distance
  tree.c[i].mser += distance
  distributeExtra(tree, i, si, distance)
}

function nextLeftContour(tree) {
  return tree.cs === 0 ? tree.tl : tree.c[0]
}

function nextRightContour(tree) {
  return tree.cs === 0 ? tree.tr : tree.c[tree.cs - 1]
}

function setLeftThread(tree, i, cl, modsumcl) {
  const li = tree.c[0].el
  li.tl = cl
  // Change mod so that the sum of modifier after following thread is correct.
  const diff = (modsumcl - cl.mod) - tree.c[0].msel
  li.mod += diff
  // Change preliminary x coordinate so that the node does not move.
  li.prelim -= diff
  // Update extreme node and its sum of modifiers.
  tree.c[0].el = tree.c[i].el
  tree.c[0].msel = tree.c[i].msel
}

// Symmetrical to setLeftThread
function setRightThread(tree, i, sr, modsumsr) {
  const ri = tree.c[i].er
  ri.tr = sr
  const diff = (modsumsr - sr.mod) - tree.c[i].mser
  ri.mod += diff
  ri.prelim -= diff
  tree.c[i].er = tree.c[i - 1].er
  tree.c[i].mser = tree.c[i - 1].mser
}

function seperate(tree, i, ih) {
  // Right contour node of left siblings and its sum of modifiers.
  let sr = tree.c[i - 1]
  let mssr = sr.mod
  // Left contour node of right siblings and its sum of modifiers.
  let cl = tree.c[i]
  let mscl = cl.mod
  while (sr !== null && cl !== null) {
    if (bottom(sr) > ih.lowY) {
      ih = ih.next
    }
    // How far to the left of the right side of sr is the left side of cl.
    const distance = mssr + sr.prelim + sr.w - (mscl + cl.prelim)
    if (distance > 0) {
      mscl += distance
      moveSubtree(tree, i, ih.index, distance)
    }

    const sy = bottom(sr)
    const cy = bottom(cl)
    if (sy <= cy) {
      sr = nextRightContour(sr)
      if (sr !== null) {
        mssr += sr.mod
      }
    }
    if (sy >= cy) {
      cl = nextLeftContour(cl)
      if (cl !== null) {
        mscl += cl.mod
      }
    }
  }

  // Set threads and update extreme nodes.
  // In the first case, the current subtree must be taller than the left siblings.
  if (sr === null && cl !== null) {
    setLeftThread(tree, i, cl, mscl)
  } else if (sr !== null && cl === null) {
    setRightThread(tree, i, sr, mssr)
  }
}

function positionRoot(tree) {
  // Position root between children, taking into account their mod.
  tree.prelim =
    (tree.c[0].prelim +
      tree.c[0].mod +
      tree.c[tree.cs - 1].mod +
      tree.c[tree.cs - 1].prelim +
      tree.c[tree.cs - 1].w) / 2 -
      tree.w / 2
}

function firstWalk(tree) {
  if (tree.cs === 0) {
    setExtremes(tree)
    return
  }

  firstWalk(tree.c[0])
  let ih = updateIYL(bottom(tree.c[0].el), 0, null)
  for (let i = 1; i < tree.cs; i++) {
    firstWalk(tree.c[i])
    const minY = bottom(tree.c[i].er)
    seperate(tree, i, ih)
    ih = updateIYL(minY, i, ih)
  }
  positionRoot(tree)
  setExtremes(tree)
}

function addChildSpacing(tree) {
  let d = 0
  let modsumdelta = 0
  for (let i = 0; i < tree.cs; i++) {
    d += tree.c[i].shift
    modsumdelta += d + tree.c[i].change
    tree.c[i].mod += modsumdelta
  }
}

function secondWalk(tree, modsum, rootAlignment) {
  modsum += tree.mod
  // Set absolute (no-relative) horizontal coordinates.
  tree.x = tree.prelim + modsum
  addChildSpacing(tree)
  for (let i = 0; i < tree.cs; i++) {
    secondWalk(tree.c[i], modsum, rootAlignment)
    if (tree.dl == null) {
      tree.dl = tree.c[0]
      tree.dr = tree.c[tree.cs - 1]
    }
    tree.dl = tree.dl.x < tree.c[i].dl.x ? tree.dl : tree.c[i].dl
    tree.dr = tree.dr.x + tree.dr.w > tree.c[i].dr.x + tree.c[i].dr.w ? tree.dr : tree.c[i].dr
  }
  if(tree.cs>0 && rootAlignment === "Median"){
    tree.x = (tree.dl.x+tree.dr.x+tree.dr.w)/2.0 - tree.w/2.0
  }
}

export function layout(tree, rootAlignment) {
  firstWalk(tree);
  secondWalk(tree, 0, rootAlignment);
}


