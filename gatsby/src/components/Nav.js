import React from 'react';
import { Link, navigate } from 'gatsby';

export default function Nav() {
	return (
		<nav>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/pizzas'>Pizza Menu</Link>
				</li>
				<li>
					<Link to='/'>LOGO</Link>
				</li>
				<li>
					<Link to='/slicemasters'>SliceMasters</Link>
				</li>
				<li>
					<Link to='/order'>Order</Link>
				</li>
			</ul>
		</nav>
	);
}
